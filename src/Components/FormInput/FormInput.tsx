import { capitalize, TextField } from "@material-ui/core";
import "./FormInput.css";
import { formFieldType } from "./FormField.types";

export function FormInput({ rows, label }: formFieldType) {
    return (
        <form className={``} noValidate autoComplete="off">
            <TextField
                id="outlined-basic"
                label={capitalize(label)}
                variant="outlined"
                rows={rows}
                multiline={Boolean(rows)}
                className={`my-field`}
            />
        </form>
    );
}
