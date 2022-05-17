import tw from 'twrnc';
import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Icon, Input, Text} from "@rneui/themed";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectStartingMileage, setStartingMileage} from "../slices/odometerSlice";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {auth, db} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import {selectUserEmail} from "../slices/userSlice";


const StartNewFillScreen = () => {
    const navigation = useNavigation();
    const [gasBrand,setGasBrand] = useState('');
    const [m2EStart,setM2EStart] = useState('');
    const [loading,setLoading] = useState(false);
    const mileageStart = useSelector(selectStartingMileage);
    const userEmail = useSelector(selectUserEmail);
    const dispatch = useDispatch();


    const getOdometerFirebase = async () => {
        const ref = doc(db,'users',`${userEmail}`,'odometer','mileage')
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const mileage = data.startingMileage
            dispatch(setStartingMileage(mileage))
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };


    const submitNewFill = async () => {
        await setDoc(doc(db,'users',`${userEmail}`,'fillInProgress','newest'), {
            startingMileage:mileageStart,
            m2EStart:m2EStart,
            gasBrand:gasBrand,
            timestamp: serverTimestamp(),
        })
    };

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }



    useEffect(() => {
        getOdometerFirebase().then()


        return () => {}
    },[])

    return(
        <SafeAreaView style={tw`h-full`}>
            <View style={[tw`border-b-2 flex p-1 m-1`]}>
                <View style={tw`flex flex-row`}>
                    <View style={tw`flex-1 flex-col`}>
                        <Text style={tw`text-4xl text-blue-600 font-extrabold tracking-wide`}>
                            Enter a
                        </Text>
                        <Text style={tw`text-4xl text-blue-600 font-extrabold tracking-wider`}>
                            New Fill
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView style={tw`flex-1`}>
                <View style={tw`p-5 py-6 border-b`}>
                    <Text style={tw`text-xl text-left m-2 underline`}>Enter the Gas Brand...</Text>
                    <Input
                        inputStyle={tw`ml-2 text-2xl`}
                        leftIcon={<Icon name='gas-pump' type='font-awesome-5' size={24} style={tw`mr-2`}/>}
                        placeholder='Arco, Chevron, etc...'
                        value={gasBrand}
                        onChangeText={(text) => setGasBrand(text)}/>
                </View>
                <View style={tw`flex flex-row mt-2 p-3 border-b`}>
                    <View style={tw`flex-1 `}>
                        <View style={tw`flex flex-col p-1 `}>
                            <Text style={tw`text-center text-xl my-auto`}>Odometer</Text>
                            <Text style={tw` text-center my-auto text-xl`}> Start:</Text>
                            <Text style={tw`p-2 m-2 text-lg text-center`}>{mileageStart}</Text>
                        </View>
                    </View>
                </View>

                <View style={tw`flex flex-row border-b mt-2 p-3`}>
                    <View style={tw`flex-1 `}>
                        <View style={tw`flex flex-col p-1 `}>
                            <Text style={tw`text-center text-xl my-auto`}>Miles-2-Empty</Text>
                            <Text style={tw` text-center my-auto text-xl`}> Start:</Text>
                            <TextInput
                                style={tw`p-2 text-lg m-2 text-center`}
                                placeholder={'...miles'}
                                placeholderTextColor={'gray'}
                                keyboardType='numeric'
                                maxLength={6}
                                returnKeyType='done'
                                value={m2EStart}
                                onChangeText={(text) => setM2EStart(text)}

                            />
                        </View>
                    </View>
                </View>
                <View style={tw`w-3/4 mx-auto mt-10`}>
                    <TouchableOpacity onPress={() => {
                        setLoading(true);
                        wait(1500).then(() => {
                            submitNewFill().then(navigation.goBack())
                        })
                    }} style={[tw`p-2 m-2 rounded-full`,{backgroundColor:'#007aff'}]}>
                        {loading ? <ActivityIndicator size={"large"} /> :
                            <Text style={tw`text-center text-white text-2xl tracking-wide font-semibold p-1 m-1`}>
                                Submit Fill
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <InfoModal dispatch={dispatch} navigation={navigation} userEmail={userEmail}/>
        </SafeAreaView>
    );
};

const InfoModal = (props) => {

    const firstFillCheck = async () => {
        const user = await auth.currentUser;
        if (user) {
            const email = user.email;
            if (!await getFirstFill(email)) {
                setIsVisible(false)

            } else  {
                setIsVisible(true)
                await changeFirstFill2False(email)
            }
        } else {
            console.log("No User Detected")
        }
    };

    const changeFirstFill2False = async (userEmail) => {
        const ref = doc(db,'users',`${userEmail}`);
        await updateDoc(ref, {
            firstFill: false,
        });
    };

    const getFirstFill = async (userEmail) => {
        const ref = doc(db,'users', `${userEmail}`)
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return data.firstFill;
        } else {
            // doc.data() will be undefined in this case
            console.error("No such document!");
        }
    }

    useEffect(() => {
        firstFillCheck().then()

        return () => {}
    },[])


    const navigation = props.navigation
    const dispatch = props.dispatch;
    const [isVisible,setIsVisible]= useState(false);
    const [odomStart,setOdomStart] = useState('');
    const handleClose = () => {
        if (!odomStart) {
            setIsVisible(false);
            navigation.navigate('Home');
        } else {
            setIsVisible(false);
        }
    };


    const setStartingOdometer = async () => {
        await setDoc(doc(db,'users',`${props.userEmail}`,'odometer','mileage'),{
            startingMileage: odomStart,
        })
    }


    return(
        <View style={tw`flex`}>
            <Modal visible={isVisible} presentationStyle={"formSheet"} animationType={"slide"} onRequestClose={handleClose}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={tw`flex-1`}
                    keyboardVerticalOffset={100}
                >
                    <View style={tw`py-1 my-1 border-b-2 `}>
                        <Text style={tw`text-xl text-center`}>
                            First Fill?
                        </Text>
                        <Text style={tw`text-center text-base`}>Here's a Heads-Up</Text>
                    </View>
                    <ScrollView style={tw` py-1 my-1`}>
                        <View style={tw``}>
                            <Text style={[tw`text-center px-2 m-1`, {color: 'red'}]}>
                                DO NOT PROCEED UNLESS YOU ARE READY TO FILL UP YOUR CAR!!
                            </Text>
                        </View>
                        <Text style={tw`text-center text-lg p-1 m-1 font-bold`}>
                            This app is purely for your own personal knowledge
                        </Text>
                        <Text style={tw`text-left text-base font-bold p-1 m-1`}>
                            The Point of this App..
                        </Text>
                        <Text style={tw`text-center p-2 m-1`}>
                            To track how accurate and consistent your car's Miles-2-Empty (M2E) gauge is
                        </Text>
                        <View style={tw``}>
                            <Text style={[tw`text-center px-2 m-1`, {color: 'red'}]}>
                                DO NOT PROCEED UNLESS YOU ARE READY TO FILL UP YOUR CAR!!
                            </Text>
                        </View>
                        <Text style={tw`text-left text-base font-bold p-1 m-1`}>
                            What you need to do..
                        </Text>
                        <Text style={tw`text-center text-base px-2 m-1`}>
                            For this first fill-up we just want to know:
                        </Text>
                        <Text style={tw`text-center px-2 m-1`}>
                            1. Starting Odometer
                        </Text>
                        <Text style={tw`text-center px-2 m-1`}>
                            2. "Full Tank" M2E gauge reading
                        </Text>
                        <Text style={tw`text-center px-2 m-1`}>
                            3. The brand of gas purchased
                        </Text>
                        <Text style={tw`text-center px-1 m-1`}>When its time to fill up again, come back (when your at the station but before you add the gas) and enter what your M2E gauge and Odometer ended at.</Text>
                        <Text style={tw`text-center text-base font-medium mt-2 p-1`}>Enter starting Odometer</Text>
                        <TextInput
                            style={tw`p-2 m-1 mx-auto text-center border`}
                            placeholder={'...miles'}
                            placeholderTextColor={'gray'}
                            keyboardType='numeric'
                            maxLength={6}
                            returnKeyType='done'
                            onChangeText={(text) => setOdomStart(text)}
                            value={odomStart}
                        />
                        <Button
                            containerStyle={tw`p-3 m-5 mt-7 shadow-xl`}
                            disabled={!odomStart}
                            onPress={() => {
                                dispatch(setStartingMileage(odomStart))
                                setStartingOdometer().then()
                                handleClose();
                            }}
                            title={'Set Odometer & Continue'}>
                        </Button>
                    </ScrollView>

                </KeyboardAvoidingView>
            </Modal>
        </View>
    )

}


export default StartNewFillScreen;