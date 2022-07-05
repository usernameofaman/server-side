import React from 'react'
import EMWSingleCustomModal from './EMWSingleCustomModal'
import { useQuery } from 'react-apollo';
import { CustomInformationModalQuery } from '../../@sdk/queries/emwCheckoutBillingQueries'


export default function EMWCustomModal({ step }) {
    const { loading, error, data, refetch, fetchMore } = useQuery(CustomInformationModalQuery, {
        fetchPolicy: "no-cache"
    });
    const [messages, setMessages] = React.useState([])
    const [dataReceived, setDateReceived] = React.useState(false)
    if (!loading && data && !dataReceived) {
        setMessages(data.customInformationForCustomer)
        setDateReceived(true)
    }
    return (
        <>
            {messages.map((item) => {
                if (item.isActive) {
                    if (step === 1 && item.displayLocation === "STEP_1")
                        return (
                            <EMWSingleCustomModal messageData={item} />
                        )
                    if (step === 2 && item.displayLocation === "STEP_1_3")
                        return (
                            <EMWSingleCustomModal messageData={item} />
                        )
                    if (step === 3 && item.displayLocation === "STEP_2_3")
                        return (
                            <EMWSingleCustomModal messageData={item} />
                        )
                    if (step === 4 && item.displayLocation === "STEP_3_4")
                        return (
                            <EMWSingleCustomModal messageData={item} />
                        )
                }
            })}
        </>
    )
}
