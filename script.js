function getUserInfo(data) {
    console.log(data);
    var userWrapper = document.getElementById('userInfo');
    if (data && data !== 'Not Found') {
        data = JSON.parse(data);
        //debugger;
        console.log(data);
        if (data.length) {
            var res = '<div><h2>User Details</h2>';
            for (var i = 0; i < data.length; i++) {
                res += '<div>' + data[i].name + '</div>';
                res += '<div>' + data[i].username + '</div>';
                res += '<div>' + data[i].email + '</div>';
                res += '<h2>Address</h2>';
                res += '<div>' + data[i].address.street + ', ' + data[i].address.suite + ', ' + data[i].address.city + ', ' + data[i].address.zipcode + '</div>';
                res += '<div>' + data[i].address.geo.lat + ', ' + data[i].address.geo.lng + '</div>';
                res += '<div>' + data[i].phone + '</div>';
                res += '<div>' + data[i].website + '</div>';
                res += '<h2>Company Details</h2>';
                res += '<div>' + data[i].company.catchPhrase + '</div>';
                res += '<div>' + data[i].company.bs + '</div>';
                res += '<div>' + data[i].company.name + '</div>';
            }
            userWrapper.innerHTML = res;
        }
    }
}
function getUserId(event) {
    var target = event.target, id = null;
    if (target.tagName == 'TD') {
        id = target.getAttribute('data-id');
    }
    if (id) {
        var url = 'https://jsonplaceholder.typicode.com/users?id=' + id;
        getCall('GET', url, getUserInfo)
    }
}
function bindClickEvent() {
    var tableWrapper = document.getElementById('table');
    tableWrapper.addEventListener('click', getUserId)
}
bindClickEvent();

function getCall(method, url, callbackFunction) {
    var requrestType = method;
    var requestURL = url;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        var loader = document.getElementById('loader');
        if (this.readyState !== 4) {
            loader.style.visibility = 'visible';
        }
        if (this.readyState == 4 && this.status == 200) {
            loader.style.visibility = 'hidden';
            callbackFunction(xhttp.response);
        }
    }
    xhttp.open(requrestType, url, true);
    xhttp.send();
}
getCall('GET', 'https://jsonplaceholder.typicode.com/users', displayData);


function displayData(data) {
    var tableWrapper = document.getElementById('table');
    var result = '';
    if (data && data !== 'Not Found') {
        data = JSON.parse(data);
        //debugger;
        console.log(data);
        if (data.length) {
            result += '<tr><th>User Name</th></tr>'
            for (var i = 0; i < data.length; i++) {
                result += '<tr>';
                result += '<td data-id=' + data[i].id + '>' + data[i].name + '</td>';
                result += '</tr>';
            }
            tableWrapper.innerHTML = result;
        }
    }
}

function pageDataDisplay(data) {
    var result = null;
    var data = JSON.parse(data);
    console.log('all data-', data)
    if (data && data.length) {
        result = data.filter(filterData)
    }
    console.log('make_model data: ', result);
}
function filterData(res) {
    return res.pageType == 'vehicle_manufacturer'
}
getCall('GET', 'https://cms.paytminsurance.co.in/pages', pageDataDisplay);