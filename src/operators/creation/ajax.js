/*
* ajax(urlOrRequest: string | AjaxRequest)
* 请求ajax数据
* */

import {ajax} from 'rxjs/ajax';

const gitHubUsers = 'https://api.github.com/users?per_page=2';
const users$ = ajax(gitHubUsers);
users$.subscribe(
    res => console.log(res),
    error => console.error(error)
);

const usersJson$ = ajax.getJSON(gitHubUsers);
usersJson$.subscribe(
    res => console.log(res),
    error => console.log(error)
);

const userComplex$ = ajax({
    url: gitHubUsers,
    method: 'GET',
    headers: {

    },
    body: {

    }
})
