import tw from 'twrnc';
import {Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Icon, Text} from "@rneui/themed";
import {useNavigation} from "@react-navigation/native";


const MyDivider = () => {
    return (
        <View
            style={[tw`bg-black mt-1 w-full`, {height: 1}]}
        />
    );
};

const EmptyList = (props) => {
    return(
        <TouchableOpacity disabled={props.fillInProgress} style={tw`m-3 text-center ${props.fillInProgress && 'opacity-20'}`} onPress={() => props.navigation.navigate('Start New Fill')}>
            <Image
                source={require('../assets/gas-gauge.png')}
                style={tw`h-58 w-50 mx-auto`}
            />
            <Text style={tw`text-2xl text-center pt-1 mt-2`}>
                Start Adding Fills to see them here!
            </Text>
        </TouchableOpacity>
    );
};

const RecentFillHistory = (props) => {
    const navigation = useNavigation();

    return(
        <View style={[tw`pb-2 px-3 pt-1 m-5 rounded-lg shadow`, {backgroundColor: '#00FFFF'}]}>
            <Text style={tw`text-3xl text-center tracking-wide`}>
                Recent Fill-ups
            </Text>
            <MyDivider/>
            <View style={tw`flex`}>
                <View style={[tw`p-2 mx-1 mt-2 bg-white justify-around rounded`]}>
                    {props.data
                        ? <RenderRecentHistory data={props.data}/>
                        : <EmptyList fillInProgress={props.fillInProgress} navigation={navigation} />
                    }
                </View>
            </View>
        </View>
    );
};

export default RecentFillHistory;


const RenderRecentHistory = (props) => {

    const OdometerDiff = (props) => {
        let diff = props.data.endingMileage - props.data.startingMileage;
        return (
            <View style={tw`p-1 mx-auto`}>
                <Text style={tw`text-center underline mb-1`}>
                    You drove:
                </Text>
                <Text style={tw`text-center text-base`}>
                    {diff}
                </Text>
                <Text style={tw`text-center text-sm`}>
                    miles
                </Text>
            </View>

        );
    };


    const DigitalMilesDiff = (props) => {
        let diff = props.data.m2EStart - props.data.m2EEnd;
        return (
            <View>
                <View style={tw`p-1 mx-auto`}>
                    <Text style={tw`text-center underline mb-1`}>
                        Your M2E gauge:
                    </Text>
                    <Text style={tw`text-center text-base`}>
                        {diff}
                    </Text>
                    <Text style={tw`text-center text-sm`}>
                        miles
                    </Text>
                </View>
            </View>
        );
    };

    const DiffIcon = (props) => {
        let odomDiff = props.data.endingMileage - props.data.startingMileage;
        let digitalDiff = props.data.m2EStart - props.data.m2EEnd;
        let truthDiff = digitalDiff - odomDiff;
        if (truthDiff > -20 && truthDiff < 20) {
            return (
                <View style={tw`my-auto`}>
                    <Icon
                        name='thumb-up'
                        type='material'
                        size={30}
                        color='green'
                    />
                    <Text style={tw`text-center text-sm mt-2`}>{truthDiff}</Text>
                    <Text style={tw`text-center`}>
                        miles
                    </Text>
                </View>
            );
        } else  {
            return (
                <View style={tw`my-auto`}>
                    <Icon
                        name='thumb-down'
                        type='material'
                        size={30}
                        color='red'
                    />
                    <Text style={tw`text-center text-sm mt-2`}>{truthDiff}</Text>
                    <Text style={tw`text-center`}>
                        miles
                    </Text>
                </View>
            );
        }
    };


    return(
        <View style={tw`flex-1`}>
            {props.data.map(it => {
                return (
                    <TouchableOpacity style={tw`flex-1 flex-row p-1 border rounded`} key={it.startingMileage} >
                        <View style={tw`flex-4 flex-col border-l border-r pb-1 `}>
                            <View style={tw`flex-1 border-b`}>
                                <Text style={tw`text-center text-sm p-1`}>
                                    How accurate is your car?
                                </Text>
                            </View>
                            <View style={tw`flex-2 flex-row`}>
                                <View style={tw`flex-1`}>
                                    <OdometerDiff data={it}/>
                                </View>
                                <View style={tw`flex-1`}>
                                    <DigitalMilesDiff data={it}/>
                                </View>
                            </View>
                        </View>
                        <View style={tw`flex-1`}>
                            <DiffIcon data={it}/>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};