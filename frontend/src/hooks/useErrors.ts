import { useState } from "react";

interface IError {
  field: string;
  message: string;
}

export function useErrors() {
  const [errors, setErrors] = useState<IError[]>([]);

  function setError({ field, message }: IError) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      setErrors(prevState => prevState.map((error) => {
        if (error.field === field) {
          return { field, message }
        }

        return error;
      }))
      
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ])
  }

  function removeError(fieldname: string) {
    setErrors((prevState) => prevState.filter((error) => (
      error.field !== fieldname
    )))
  }

  function getErrorMessageByFieldname(fieldname: string) {
    return errors.find((error) => error.field === fieldname)?.message;
  }

  return { errors, setError, removeError, getErrorMessageByFieldname };
}