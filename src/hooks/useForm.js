import { useMemo, useState } from "react";

const useForm = (required=[]) => {
    const [inputData, setInputData] = useState({});

    const [error, setError] = useState({});

    const handleInput = e => {
        const { value, name, files } = e.target;

        const req = required.indexOf(name)!==-1;

        const handleError = isError => setError(preError => ({...preError, [name]: isError}));

        const setData = () => setInputData(data=> ({...data, [name]: name==='image'?files[0]:value}));

        if (req&&name==='email') {
            const isValid = /\S+@\S+\.\S+/.test(value);
            if (isValid) {
                handleError(false);
                setData();
            }
            else {
                handleError(true);
            }
        }
        else if (req&&name==='password') {
            const isValid = value.length>=6;
            if (isValid) {
                handleError(false);
                setData();
            }
            else {
                handleError(true);
            }
        }
        else if (req&&name==='confirmPassword') {
            const isValid = value.length>=6;
            const match = inputData.password === value;
            if (isValid&&match) {
                handleError(false);
                setData();
            }
            else {
                handleError(true);
            }
        }
        else if (req&&value.length<1) {
            handleError(true);
        }
        else{
            handleError(false);
            setData();
        }
    }

    const handleSubmit = useMemo(() => submit => e => {
        e.preventDefault();
        required.forEach(item => {
            if (!inputData[item]) {
                setError(preError => ({...preError, [item]: true}));
            }
        })
        const filtered = required.filter(item => !inputData[item]);

        if (filtered.length){
            [...e.target].forEach(item=> item.name===filtered[0]&&item.focus());
        }
        else{
            submit(inputData, e);
            e.target.reset();
            setInputData({});
            setError({});
        }
    }, [required, inputData])

    return {
        handleInput,
        handleSubmit,
        error,
        inputData
    }
};

export default useForm;