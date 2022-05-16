import tw from 'twrnc';
import {FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Text} from "@rneui/themed";
import {collection, query, orderBy, onSnapshot, doc, getDocs} from 'firebase/firestore';
import {db} from "../firebase";
import {useEffect, useState} from "react";

const FullFillHistoryScreen = () => {
    const [data,setData] = useState([]);

    const fetchHistory = async () => {
        const ref = collection(db,'finalFills');
        const docSnap = await getDocs(ref);
        const arr = [];
        docSnap.forEach((doc) => {
            let thisData = doc.data();
            arr.push({
                endingMileage:thisData.endingMileage,
                gasBrand:thisData.gasBrand,
                m2EEnd:thisData.m2EEnd,
                m2EStart:thisData.m2EStart,
                secondTimeGasBrand: thisData.secondTimeGasBrand,
                startingMileage:thisData.startingMileage,
            })
        });
        setData(arr);
    }

    useEffect(() => {
        fetchHistory().then()

        return () => {};
    },[])



    return (
        <SafeAreaView style={tw`h-full`}>
            <FullFillHistoryTitle/>
            <RenderHistoryList data={data}/>
        </SafeAreaView>
    );
};

export default FullFillHistoryScreen;


const RenderHistoryList = (props) => {



    return(
        <FlatList data={props.data} renderItem={({item}) => (
            <TouchableOpacity
                // onPress={() => props.navigation.navigate('Specific Fill Screen', {item:item})}
                style={tw`flex-row items-center p-1 border-b m-1 mt-0 `}>
                <View style={tw`flex-1 flex-row`}>
                    <View style={tw`flex-2 `}>
                        <Text style={tw`text-center mt-1 text-base`}>Initial fill at:</Text>
                        <View style={tw`my-auto`}>
                            <Text style={tw`text-center font-semibold`}>{item.gasBrand}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-2 flex-col border-l border-r`}>
                        <View style={tw`flex-1 border-b p-1`}>
                            <Text style={tw`text-center text-sm`}>Starting Mileage:</Text>
                            <Text style={tw` text-center text-sm font-semibold`}>{item.startingMileage}</Text>
                        </View>
                        <View style={tw`flex-1 border-t p-1`}>
                            <Text style={tw` text-center text-sm`}>Starting F-2-E Gauge:</Text>
                            <Text style={tw` text-center text-sm font-semibold`}>{item.m2EStart}</Text>
                        </View>
                    </View>
                </View>
                <View style={tw`flex-1 flex-row`}>
                    <View style={tw`flex-2 `}>
                        <Text style={tw`text-center mt-1 text-base`}>Second fill:</Text>
                        <View style={tw`my-auto`}>
                            <Text style={tw`text-center font-semibold`}>{item.secondTimeGasBrand}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-2 flex-col border-l border-r`}>
                        <View style={tw`flex-1 border-b p-1`}>
                            <Text style={tw`text-center text-sm`}>Ending Mileage:</Text>
                            <Text style={tw` text-center text-sm font-semibold`}>{item.endingMileage}</Text>
                        </View>
                        <View style={tw`flex-1 border-t p-1`}>
                            <Text style={tw` text-center text-sm`}>Ending F-2-E Gauge:</Text>
                            <Text style={tw` text-center text-sm font-semibold`}>{item.m2EEnd}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )}/>
    )
}


const FullFillHistoryTitle = () => {
    return(
        <View style={tw`p-2 px-3 m-1 mb-2 border-b-2`}>
            <View style={tw`flex flex-row `}>
                <View style={tw`flex-1 flex-col`}>
                    <Text style={tw`text-4xl text-blue-600 font-extrabold tracking-widest`}>
                        NOMAD
                    </Text>
                    <Text style={tw`text-3xl text-blue-600 font-semibold tracking-tight`}>
                        Gas Tracker
                    </Text>
                </View>
                <View style={tw`flex-1 flex-col`}>
                    <Text style={tw`text-4xl font-semibold text-blue-600 tracking-wide text-right`}>
                        Fill
                    </Text>
                    <Text style={tw`text-3xl font-semibold text-blue-600 tracking-wide text-right`}>
                        History
                    </Text>
                </View>
            </View>
        </View>
    );

}