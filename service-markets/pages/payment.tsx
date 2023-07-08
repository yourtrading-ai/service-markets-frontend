import { RequestNetwork, Types, Utils } from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { useWalletClient } from "wagmi";
import { goerli } from "wagmi/chains";

export default function Payment() {
    // //connect to provider

    // const { data: walletClient } = useWalletClient({ chain: goerli.id });
    // const web3SignatureProvider = new Web3SignatureProvider(walletClient);
    // const requestClient = new RequestNetwork({
    //     nodeConnectionConfig: { 
    //         baseURL: "https://goerli.gateway.request.network/",
    //     },
    //     web3SignatureProvider,
    // });

    // const payeeAddress = '0x7eB023BFbAeE228de6DC5B92D0BeEB1eDb1Fd567';
    // const payerAddress = '0x2346ac3Bc15656D4dE1da99384B5498A75f128a2';
    // const zeroAddress = '0x0000000000000000000000000000000000000000';

    // const requestCreateParameters: Types.ICreateRequestParameters = {
    //     requestInfo: {
    //       currency: {
    //         type: Types.RequestLogic.CURRENCY.ETH,
    //         value: '0x',
    //         network: 'goerli',
    //       },
    //       expectedAmount: 1234000000000000000000,
    //       payee: {
    //         type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    //         value: payeeAddress,
    //       },
    //       payer: {
    //           type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    //           value: payerAddress,
    //       },
    //       timestamp: Utils.getCurrentTimestampInSecond(),
    //     },
    //     paymentNetwork: {
    //       id: Types.Extension.PAYMENT_NETWORK_ID.ETH_INPUT_DATA,
    //       parameters: {
    //         paymentNetworkName: 'goerli',
    //         paymentAddress: payeeAddress,
    //         refundAddress: zeroAddress,
    //       },
    //     },
    //     contentData: {
    //       // Tip: Consider using rnf_invoice v0.0.3 format from @requestnetwork/data-format
    //       reason: '🍕',
    //       dueDate: '2023.06.16',
    //     },
    //     signer: {
    //       type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    //       value: payeeAddress,
    //     },
    // };

    // const requestPay = async () => {
    //     const request = await requestClient.createRequest(requestCreateParameters);
    //     const confirmedRequest = await request.waitForConfirmation();
    //     const requestData = request.getData();
    //     console.log(requestData);
    // }

    return (
        <div>
            <h1>Payment</h1>
            <button onClick={requestPay}>Pay</button>
        </div>
    )
}