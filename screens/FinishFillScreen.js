import tw from 'twrnc';
import {ActivityIndicator, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import {Text} from "@rneui/themed";
import {useState} from "react";
import {doc, deleteDoc, addDoc, collection, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {useNavigation} from "@react-navigation/native";



const FinishFillScreen = ({route}) => {
    const { item } = route.params

    return(
        <SafeAreaView style={tw`flex-1`}>
            <View style={[tw`border-b-2 flex ml-1`]}>
                <View style={tw`flex flex-row`}>
                    <View style={tw`flex-1 flex-col`}>
                        <Text style={tw`text-4xl text-blue-600 font-extrabold  tracking-widest`}>
                            NOMAD
                        </Text>
                        <Text style={tw`text-3xl text-blue-600 font-semibold tracking-tight`}>
                            Gas Tracker
                        </Text>
                    </View>
                </View>
            </View>
            <FillInProgressComponent item={item}/>
        </SafeAreaView>
    )

};

export default FinishFillScreen;



const FillInProgressComponent = ({item}) => {
    const [odomEnd,setOdomEnd] = useState('');
    const [m2EEnd,setM2EEnd] = useState('');
    const [gasBrand,setGasBrand] = useState('');
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const deleteFirestoreDoc = async  () => {
        await deleteDoc(doc(db,'fillInProgress','newest'))

    }

    const submitFinalFill = async () => {
        await addDoc(collection(db,'finalFills'),{
            gasBrand:item.gasBrand,
            m2EStart:item.m2EStart,
            m2EEnd:m2EEnd,
            secondTimeGasBrand:gasBrand,
            startingMileage:item.startingMileage,
            endingMileage: odomEnd,
            currentTimestamp:serverTimestamp(),
            initialTimestamp:item.timestamp,
        })
        await setDoc(doc(db,'odometer','mileage'),{
            startingMileage: odomEnd,
        })
    };


    return(
        <ScrollView style={tw`flex-1`}>
            <View style={tw`flex flex-row mt-2 p-3 border-b`}>
                <View style={tw`flex-1 border-r`}>
                    <Text style={tw`text-xl text-center mt-1 font-semibold tracking-wide`}>Gas Brand</Text>
                    <Text style={[tw`text-xl text-center mb-1 font-semibold tracking-wide`]}>First Fill:</Text>
                    <Text style={tw`text-xl text-center m-1 mt-3 `}>{item.gasBrand}</Text>
                </View>
                <View style={tw`flex-1 border-l`}>
                    <Text style={tw`text-xl text-center mt-1 font-semibold tracking-wide`}>Gas Brand</Text>
                    <Text style={tw`text-xl text-center mb-1 font-semibold tracking-wide`}>This Fill:</Text>
                    <TextInput style={tw`m-2 text-center text-xl `}
                               placeholder={'Arco, Chevron, ...'} placeholderTextColor={'gray'}
                               keyboardType='default'
                               maxLength={12}
                               returnKeyType='done'
                               onChangeText={(text) => setGasBrand(text)}
                               value={gasBrand}
                    />
                </View>
            </View>
            <View style={tw`flex flex-row mt-2 p-3 border-b`}>
                <View style={tw`flex-1 border-r `}>
                    <View style={tw`flex flex-col p-1 `}>
                        <Text style={tw`text-center font-semibold text-lg my-auto`}>Odometer</Text>
                        <Text style={tw` text-center font-semibold my-auto text-lg`}>Start:</Text>
                        <Text style={tw`text-center p-1 mt-2 text-xl`}>{item.startingMileage} </Text>
                    </View>
                </View>
                <View style={tw`flex-1 border-l`}>
                    <View style={tw`flex flex-col p-1 `}>
                        <Text style={tw`text-center font-semibold text-lg my-auto`}>Odometer</Text>
                        <Text style={tw`text-center font-semibold my-auto text-lg`}>End:</Text>
                        <TextInput style={tw`m-2 text-center text-xl`}
                                   placeholder={'...miles'} placeholderTextColor={'gray'}
                                   keyboardType='numeric'
                                   maxLength={6}
                                   returnKeyType='done'
                                   onChangeText={(text) => setOdomEnd(text)}
                                   value={odomEnd}
                        />
                    </View>
                </View>
            </View>
            <View style={tw`flex flex-row border-b mt-2 p-3`}>
                <View style={tw`flex-1 border-r `}>
                    <View style={tw`flex flex-col p-1 `}>
                        <Text style={tw`text-center font-semibold text-lg my-auto`}>Miles-2-Empty</Text>
                        <Text style={tw` text-center font-semibold my-auto text-lg`}>Start:</Text>
                        <Text style={tw`text-center p-1 mt-2 text-xl`}>{item.m2EStart} </Text>
                    </View>
                </View>
                <View style={tw`flex-1 border-l`}>
                    <View style={tw`flex flex-col p-1 `}>
                        <Text style={tw`text-center font-semibold text-lg my-auto`}>Miles-2-Empty</Text>
                        <Text style={tw`text-center font-semibold my-auto text-lg`}>End:</Text>
                        <TextInput style={tw`m-2 text-center text-xl`}
                                   placeholder={'...miles'} placeholderTextColor={'gray'}
                                   keyboardType='numeric'
                                   maxLength={6}
                                   returnKeyType='done'
                                   onChangeText={(text) => setM2EEnd(text)}
                                   value={m2EEnd}
                        />
                    </View>
                </View>
            </View>
            <View style={tw`w-3/4 mx-auto mt-10`}>
                <TouchableOpacity
                    onPress={() => {
                        setLoading(true);
                        wait(1500).then(() => {
                            submitFinalFill().then(() => {
                                deleteFirestoreDoc()
                                    .then(console.log('Firestore Doc Deleted!'))
                                    .then(navigation.goBack())
                            })
                        })
                    }}
                    style={[tw`p-2 m-2 rounded-full`,{backgroundColor:'#007aff'}]}
                >
                    {loading ? <ActivityIndicator size={"large"} /> :
                        <Text style={tw`text-center text-white text-2xl tracking-wide font-semibold p-1 m-1`}>
                            Submit Fill
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

}