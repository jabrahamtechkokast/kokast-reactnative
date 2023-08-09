const fetchData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = 'SET OUT1 VS IN2\n ';

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = fetch("http://192.168.1.21:23", requestOptions);
        const result = response.text();
        console.log(result);
    }catch(error){
        console.log('Error', error);
    }
};