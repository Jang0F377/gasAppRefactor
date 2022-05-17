import tw from 'twrnc';
import {ActivityIndicator, Image, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import {Icon, Text} from "@rneui/themed";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {collection, getDocs, getDoc,doc} from "firebase/firestore";
import {auth, db} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import RecentFillHistory from "../components/RecentFillHistory";
import {signOut} from 'firebase/auth'
import {useSelector} from "react-redux";
import {selectUserEmail} from "../slices/userSlice";


const HomeScreen = ({navigation}) => {
    const [fillInProgress,setFillInProgress] = useState(false);
    const [fillInProgressData,setFillInProgressData] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const userEmail = useSelector(selectUserEmail)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1500)
            .then(() => {
                fetchData().then()
            })
            .then(() => setRefreshing(false));
    }, []);

    const fetchData = async () => {
        console.log('FETCHING WITH EMAIL:',userEmail)
        const ref = doc(db,'users',`${userEmail}`,'fillInProgress','newest');
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            setFillInProgress(true)
            const data = docSnap.data();
            setFillInProgressData(data);
        } else {
            setFillInProgress(false);
        }
    };

    const signOutFirebase = async () => {
        await signOut(auth)
            .then(() =>{
                console.log('SIGN OUT SUCCESS');
                navigation.replace('Login');
            })
            .catch(err => alert(err));
    }

    useEffect(() => {
        fetchData().then()
        console.log(userEmail);
        return () => {}
    },[userEmail])

    const FillInProgressImage = () => {

        return(
            <View style={tw`flex`}>
                <TouchableOpacity style={[tw`p-4 mx-13 my-3 rounded-lg shadow`, {backgroundColor: '#00FFFF'}]} onPress={() => {
                    navigation.navigate('Finish Fill',{item:fillInProgressData});
                }} >
                    <Image
                        source={require('../assets/gas-pump.png')}
                        style={tw`h-50 w-50 p-2 mx-auto`}
                    />
                    <Text style={tw`text-2xl font-semibold text-center pt-1 mt-2`}>
                        You have a fill in progress!
                    </Text>
                    <Text style={tw`text-lg text-center pt-1 mt-2`}>
                        Press <Text style={tw`font-bold underline`}>Here</Text> to finish adding the details!
                    </Text>
                </TouchableOpacity>
            </View>

        )

    }

    return(
        <SafeAreaView style={tw`h-full`}>
            <HeaderComponent inProgress={fillInProgress} signOut={signOutFirebase}/>
            <ScrollView style={tw`flex-1`} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                <View style={tw`flex-row justify-evenly m-5`}>
                    <FillHistory navigation={navigation}/>
                    <WelcomeUser userEmail={userEmail}/>
                </View>
                {fillInProgress ? <FillInProgressImage/> : <View/>}
                <View>
                    <RecentFillHistory fillInProgress={fillInProgress}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

};

const HeaderComponent = (props) => {
    const navigation = useNavigation();


    return(
        <View style={[tw`border-b-2 flex p-1 m-1`]}>
            <View style={tw`flex flex-row`}>
                <View style={tw`flex-1 flex-col`}>
                    <Text style={tw`text-4xl text-blue-600 font-extrabold tracking-widest`}>
                        NOMAD
                    </Text>
                    <Text style={tw`text-3xl text-blue-600 font-semibold tracking-tight`}>
                        Gas Tracker
                    </Text>
                </View>
                <View style={tw`flex flex-row`}>
                    <TouchableOpacity
                        onPress={props.signOut}
                        style={tw`my-auto mx-auto`}
                    >
                        <Icon name='minus' type='font-awesome-5' size={40} style={tw`my-auto mx-auto mr-5 p-1`}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={props.inProgress}
                        style={tw`my-auto mx-auto ${props.inProgress && 'opacity-20'}`}
                        onPress={() => navigation.navigate('Start New Fill')}
                    >
                        <Icon name='plus' type='font-awesome-5' size={40} style={tw`my-auto mx-auto p-1`}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}

const WelcomeUser = (props) => {
    return (
        <TouchableOpacity
            style={[tw`flex-1 rounded-lg pt-2 pb-2 px-3 mx-2 shadow-lg`, {backgroundColor: '#00FFFF'}]}
        >
            <Text style={tw`text-xl`}>Hello,</Text>
            <Text style={tw`text-3xl tracking-wide font-semibold`}>{props.userEmail.split('@')[0]}</Text>
            <View style={tw`flex flex-row justify-evenly`}>
                <Icon name='user-circle' color='white' style={tw`py-1 px-3 bg-black rounded-full w-15 mt-3`} type='font-awesome'/>
                <Icon
                    style={tw`py-1 px-3 bg-black rounded-full w-15 mt-3`}
                    name='arrowright' color='white' type='antdesign' />
            </View>
        </TouchableOpacity>
    );
}

const FillHistory = (props) => {

    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate('History');
            }}
            style={[tw`rounded-lg flex-1 pt-2 pb-2 px-3 mx-2 shadow-lg`, {backgroundColor: '#00FFFF'}]}
        >
            <Text style={tw`text-2xl font-semibold tracking-wide text-center my-auto`}>Full Fill History Press Here</Text>

        </TouchableOpacity>
    );

}

export default HomeScreen;