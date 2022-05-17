import tw from 'twrnc';
import {KeyboardAvoidingView, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Input, Text} from "@rneui/themed";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from "../firebase";
import {doc, setDoc} from "firebase/firestore";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../slices/userSlice";


const RegisterScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const sendUserToFirestore = async (email) => {
        await setDoc(doc(db,'users', email), {
            firstFill:true,
        })
    };

    const registerAccount = async () => {
        await createUserWithEmailAndPassword(auth,email,password)
            .then((authUser) => {
                const user = authUser.user;
                sendUserToFirestore(user.email)
                    .then(() => {
                        dispatch(login(user.email))
                    })
                    .catch(err => alert(err))
            })
            .then(() => {
                wait(1500).then(() => {
                    navigation.replace('Home')
                })
            })
            .catch(err => alert(err))

    }

    return(
        <SafeAreaView style={tw`h-full`}>
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
            <KeyboardAvoidingView behavior={"padding"} style={tw`flex-1 justify-center items-center p-5`}>
                <View style={tw`flex mt-8 mb-5 py-10 px-7 bg-blue-700 rounded-3xl shadow-lg`}>
                    <Text style={tw`text-center text-white text-6xl`}>
                        REGISTER
                    </Text>
                    <Text style={tw`text-center text-white text-6xl`}>
                        HERE
                    </Text>
                </View>
                <View style={tw`flex p-2 mt-4 mb-1 w-full`}>
                    <Input placeholder='Email'
                           type='email'
                           value={email}
                           onChangeText={text => setEmail(text)}
                    />
                    <Input placeholder='Password'
                           secureTextEntry
                           type='password'
                           value={password}
                           onChangeText={text => setPassword(text)}
                    />
                </View>
                <View style={tw`flex-1 w-3/4 mx-auto mt-10`}>
                    <TouchableOpacity
                        disabled={!email || !password}
                        style={tw`flex bg-blue-700 rounded-xl p-2 m-3 shadow-md`}
                        onPress={registerAccount}
                    >
                        <Text style={tw`text-center text-xl text-white`}>
                            Create my account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`flex mx-auto bg-blue-700 rounded-xl p-2 m-3 shadow-md`}
                        onPress={() => navigation.replace('Login')}
                    >
                        <Text style={tw`text-center my-auto text-xl text-white`}>
                            Back to login
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:125}}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;