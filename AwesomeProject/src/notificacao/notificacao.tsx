import { Text } from "react-native";
import notifee, { AndroidImportance } from "@notifee/react-native";


export async function displayNotification(id: number, valor?: number) {
await notifee.requestPermission();

const channelId = await notifee.createChannel({
    id: 'Notificacao',
    name: 'Notificacoes para o app',
    vibration: true,
    importance: AndroidImportance.HIGH,
});
    if(id === 1){
        try{
            await notifee.displayNotification({
                id: '1',
                title: 'Transferência realizada',
                body: `Transferência realizada no valor de R$${valor} com sucesso!!`,
                android: {channelId}
            })
        }catch(err){
            console.log(err)
        }
    }
    if(id === 2){
        try{
            await notifee.displayNotification({
                id: '2',
                title: 'Transferência recebida',
                body: `Transferência recebida no valor de R$${valor}!!`,
                android: {channelId}
            })
        }catch(err){
            console.log(err)
        }
    }

}
      
