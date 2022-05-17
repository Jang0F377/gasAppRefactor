import tw from 'twrnc';
import {SafeAreaView, View} from "react-native";
import {Text} from "@rneui/themed";



const UserAccountScreen = () => {


    return(
        <SafeAreaView style={tw`h-full`}>
            <UserAccountScreenTitle/>
        </SafeAreaView>
    );
};

export default UserAccountScreen;

const UserAccountScreenTitle = () => {
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
                    <Text style={tw`text-3xl font-bold text-blue-600 text-right`}>
                        Account
                    </Text>
                    <Text style={tw`text-3xl font-bold text-blue-600 tracking-wider text-right`}>
                        Screen
                    </Text>
                </View>
            </View>
        </View>
    );

}