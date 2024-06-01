import analytics, { firebase } from "@react-native-firebase/analytics"

export async function logEvent(logName: string, param: any  ) {
    await firebase
        .analytics()
        .logEvent(logName, {
            param: param,
        })
}