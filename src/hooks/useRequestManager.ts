import { useState } from 'react';
import IRequestManager from '../interfaces/request/IRequestManager';
import BasicStatus from '../interfaces/BasicStatus';
import axios from 'axios';

export default function useRequestManager<Request, Response>(): IRequestManager<Request, Response> {
    const [status, setStatus] = useState<BasicStatus>(BasicStatus.None);
    const [data, setData] = useState<Response | null>(null);

    function get(url: string, data?: Request) {
        setStatus(BasicStatus.Doing);
        axios
            .get(url, {params: data})
            .then(res => {
                setData(res.data);
                setStatus(BasicStatus.Success);
            })
            .catch(res => {
                setStatus(BasicStatus.Failed);
            });
    }

    function post(url: string, data?: Request) {
        setStatus(BasicStatus.Doing);
        axios
            .post(url, data)
            .then(res => {
                setData(res.data);
                setStatus(BasicStatus.Success);
            })
            .catch(res => {
                setStatus(BasicStatus.Failed);
            });
    }

    return {
        get,
        post,
        status,
        data,
    }
}
