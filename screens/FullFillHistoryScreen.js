import tw from 'twrnc';
import {FlatList, SafeAreaView, View} from "react-native";
import {Text} from "@rneui/themed";
import {collection, query, orderBy, onSnapshot, doc, getDocs} from 'firebase/firestore';
import {db} from "../firebase";
import {useEffect, useState} from "react";

const FullFillHistoryScreen = () => {
    const [data,setData] = useState([]);

    const fetchHistory = async () => {
        const ref = collection(db,'finalFills');
        const docSnap = await getDocs(ref)
        docSnap.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
        })
    }

    useEffect(() => {
        fetchHistory().then()

        return () => {}
    },[])



    return (
        <SafeAreaView style={tw`h-full`}>
            <FullFillHistoryTitle/>
            {/*<RenderHistoryList data={data}/>*/}
        </SafeAreaView>
    );
};

export default FullFillHistoryScreen;


const RenderHistoryList = (props) => {



    return(
        <FlatList data={props.data} renderItem={props.data.id}/>
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