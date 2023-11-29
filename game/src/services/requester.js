const host = 'http://localhost:3000/api';

async function request(method, url, data) {
    console.log(data);
    const options = {method, headers: {}};

    const userData = JSON.parse(localStorage.getItem('auth'));
    if (userData) {
        const token = userData.accessToken;
        options.headers['X-Authorization'] = token;
    }

    if (data != undefined) {
        //options.headers['Content-Type'] = 'multipart/form-data; boundary=<calculated when request is sent>';
        options.headers['Content-Type'] = 'application/json';
        options.headers['enctype'] = 'multipart/form-data';
        // 'enctype': 'multipart/form-data'
        options.body = JSON.stringify(data);
        console.log(options.body);
    }

    try {
        const response = await fetch(host + url, options);
        let result;

        if (response.status !== 204) {
            result = await response.json();
        }

        if (response.ok == false) {
            if(response.status == 403) {
                localStorage.removeItem('auth');
            }

            const error = result
            throw error;
        }

        console.log(result);
        return result

    } catch (err) {
        alert(err.message);
        throw err;
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');