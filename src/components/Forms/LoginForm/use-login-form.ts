import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import useApiAuth from "@/api/use-api-auth.tsx";
import { useEffectOnce } from "@/common/hooks/useEffectOnce.tsx";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";
import { useAppDispatch } from "@/store/hooks/hooks.ts";
import { iniActions } from "@/store/slises/Ini/iniSlice.ts";

const schema = Joi.object<IDummyAuth>({
  username: Joi.string().required().messages({
    "string.base": "Username must be a string",
    "any.required": "Username is required",
    "string.empty": "Username is not allowed to be empty",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is not allowed to be empty",
  }),
  expiresInMins: Joi.number().min(30).max(60).required().messages({
    "any.required": "ExpiresInMins is required",
    "number.min": "ExpiresInMins must be at least 30",
    "number.max": "ExpiresInMins must be at most 60",
    "string.empty": "ExpiresInMins is not allowed to be empty",
  }),
});

export const useLoginForm = () => {
  const { apiAuthService } = useApiAuth();
  const location = useLocation();
  const user = location.state?.user as IDummyAuth;
  const dispatch = useAppDispatch();
  const initialValues: IDummyAuth = {
    username: user?.username || "",
    password: user?.password || "",
    expiresInMins: user?.expiresInMins || 30,
  };
  const [formData, setFormData] = useState<IDummyAuth>(initialValues);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IDummyAuth>({
    resolver: joiResolver(schema),
    defaultValues: formData,
    mode: "all",
  });

  useEffectOnce(() => {
    if (user) {
      setFormData(initialValues);
      reset(initialValues);
    }
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit: SubmitHandler<IDummyAuth> = (data) => {
    apiAuthService.login(data);
  };

  const handleReset = () => {
    setFormData({ username: "", password: "", expiresInMins: 30 });
    reset({ username: "", password: "", expiresInMins: 30 });
    dispatch(iniActions.unsetMe());
    dispatch(iniActions.unsetTokenPair());
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    handleReset,
    onSubmit,
    formData,
  };
};
