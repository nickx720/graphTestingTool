
const KeylinesMock = async () => {
    const response = await fetch('http://www.mocky.io/v2/5d9706613b00007400c31332');
    const myJson = await response.json();
    // console.log(JSON.stringify(myJson));
    return myJson;

}

const KeylinesSync = async (data) => {
    const url = 'https://dev-k8smaster.uksouth.cloudapp.azure.com/connections-analysis-service/api/v1/person-connections/_sync';
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
    const myJson = await response.json();
    return myJson;
}

export { KeylinesMock, KeylinesSync };