import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";
import { ResizableWrapper } from "@/components/All/ResizableWrapper/ResizableWrapper.tsx";
import { useLoginForm } from "@/components/Forms/LoginForm/use-login-form.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

import css from "@/components/Forms/LoginForm/form.module.css";

const LoginForm = () => {
  const { register, handleSubmit, errors, isValid, handleReset, onSubmit } =
    useLoginForm();

  type FormField = {
    label: string;
    type: string;
  };

  type FormFields = {
    [key in keyof IDummyAuth]: FormField;
  };

  const formFields: FormFields = {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
    expiresInMins: { label: "Expires In Minutes", type: "number" },
  };

  return (
    <div className={css.container}>
      <ResizableWrapper>
        <div className={"text-3xl text-center"}>Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          {Object.entries(formFields).map(([key, { label, type }]) => (
            <div key={key} className={css.formGroup}>
              <label htmlFor={key}>{label}</label>
              <Input
                {...register(key as keyof IDummyAuth)}
                id={key}
                type={type}
              />
              {errors[key as keyof IDummyAuth] && (
                <p className={css.error}>
                  {errors[key as keyof IDummyAuth]?.message}
                </p>
              )}
            </div>
          ))}
          <div className={css.buttonGroup}>
            <Button type="submit" disabled={!isValid}>
              Login
            </Button>
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </ResizableWrapper>
    </div>
  );
};

export default LoginForm;
