export const fetchData = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = data;

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = fetch("http://192.168.1.158:23", requestOptions);
        const result = response.text();
        console.log(result);
    }catch(error){
        console.log('Error', error);
    }
};