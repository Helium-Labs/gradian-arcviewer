import algosdk from 'algosdk';
import { getAlgokitTestkit } from "algokit-testkit";
import { AlgorandNFTViewer } from '../src'
import 'dotenv/config'

const networks = ["Mainnet", "Testnet", "Devnet"];
type Network = (typeof networks)[number];
const env: Network = "Testnet" as Network

const getAlgod = async () => {
  if (env === 'Testnet') {  // Type-safe comparison
    // Define the Algorand node connection parameters
    const algodToken = '' // free service does not require tokens
    const algodServer = 'https://testnet-api.algonode.cloud'
    const algodPort = 443

    // Create an instance of the algod client
    return new algosdk.Algodv2(algodToken, algodServer, algodPort)
  } else {
    const { algod } = await getAlgokitTestkit()
    return algod
  }
}

test("Can get NFT asset data", async () => {
  const algod = await getAlgod()
  const viewer = new AlgorandNFTViewer(algod)
  const asset = await viewer.getAssetMetadata(720477628, false)
  const EXPECTED_ASSET = {
    "index": 720477628,
    "arcMetadata": {
      "standards": [
        "ARC19"
      ],
      "httpsImageUrl": "https://ipfs.io/ipfs/bafkreigznqnl5aqryqt2hmhenrfiog4wghlprgbtcn63scko6z4vjnpw4q",
      "arc19Metadata": {
        "name": "551WFhWjxXysyq8JQCJhhUbbw73SkkK5",
        "description": "test",
        "image": "ipfs://bafkreigznqnl5aqryqt2hmhenrfiog4wghlprgbtcn63scko6z4vjnpw4q",
        "image_integrity": "sha256-2WwavoIRxCejsORsSocbljHW+JgzE325CU72eVS19uQ=",
        "image_mimetype": "image/jpeg",
        "external_url": "https://test.com",
        "properties": {
          "test": 123
        }
      }
    },
    "params": {
      "clawback": "J2IJ3APO246JCRCVDKDDGKWBV54MZDYW5COQLM6JOHMOQN6M4ALZSNUUBQ",
      "creator": "J2IJ3APO246JCRCVDKDDGKWBV54MZDYW5COQLM6JOHMOQN6M4ALZSNUUBQ",
      "decimals": 0,
      "default-frozen": false,
      "freeze": "J2IJ3APO246JCRCVDKDDGKWBV54MZDYW5COQLM6JOHMOQN6M4ALZSNUUBQ",
      "manager": "J2IJ3APO246JCRCVDKDDGKWBV54MZDYW5COQLM6JOHMOQN6M4ALZSNUUBQ",
      "name": "test",
      "name-b64": "dGVzdA==",
      "reserve": "IVEVSYOSDE2DQY7XQHSGLU4ZY4PISF5P5SF4XP4XOPXRGXHLRLR6W2DOJE",
      "total": 1000,
      "unit-name": "test",
      "unit-name-b64": "dGVzdA==",
      "url": "template-ipfs://{ipfscid:1:raw:reserve:sha2-256}",
      "url-b64": "dGVtcGxhdGUtaXBmczovL3tpcGZzY2lkOjE6cmF3OnJlc2VydmU6c2hhMi0yNTZ9"
    }
  }
  expect(JSON.stringify(asset)).toEqual(JSON.stringify(EXPECTED_ASSET))
}, 120_000)