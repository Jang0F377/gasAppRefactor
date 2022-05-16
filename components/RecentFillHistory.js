import tw from 'twrnc';
import {Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Text} from "@rneui/themed";
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
                    <EmptyList fillInProgress={props.fillInProgress} navigation={navigation}/>

                </View>
            </View>
        </View>
    );
};

export default RecentFillHistory;