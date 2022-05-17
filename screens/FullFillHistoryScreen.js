import tw from 'twrnc';
import {FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Text} from "@rneui/themed";


const FullFillHistoryScreen = ({route}) => {
    const { item } = route.params;

    return (
        <SafeAreaView style={tw`h-full`}>
            <FullFillHistoryTitle/>
            <RenderHistoryList data={item}/>
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
};