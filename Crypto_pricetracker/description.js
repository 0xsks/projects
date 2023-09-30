// description.js

// Sample descriptions for the cryptocurrencies
const descriptions = {
    bitcoin: 'Bitcoin is the first cryptocurrency, a decentralized digital currency that enables instant payments to anyone, anywhere in the world. Bitcoin uses peer-to-peer technology to operate with no central authority.',
    ethereum: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform, which is used to pay for transactions and computational services on the network.',
    solana: 'Solana is a high-performance blockchain platform designed for decentralized applications and cryptocurrencies. It offers fast transaction speeds and low fees, making it suitable for a wide range of use cases.',
    'matic-network': 'Polygon, formerly known as Matic Network, is a Layer 2 scaling solution for Ethereum. It aims to provide faster and cheaper transactions while maintaining compatibility with the Ethereum network.'
};

// Function to fetch and display the description for a cryptocurrency
export function fetchAndDisplayDescription(symbol) {
    const descriptionText = document.getElementById('crypto-description-text');

    if (descriptions[symbol]) {
        descriptionText.textContent = descriptions[symbol];
    } else {
        descriptionText.textContent = 'Description not available';
    }
}
