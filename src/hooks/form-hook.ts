import { createFormHook } from "@tanstack/react-form";

import {
  Select,
  SubmitButton,
  TextArea,
  TextField,
  PasswordField,
} from "../components/FormComponents";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    Select,
    TextArea,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
