import {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons"
export default function Input({label,type,add,id,checked,style,styleInput,value,onChange,inputValue,pattern,inputMode,className}){

  const [showPassword,setShowPassword]=useState(false)

  let inputField;

if (checked) {
  inputField = (
    <div className={style}>
      <input
        type={type}
        id={id}
        className={styleInput}
        checked={!!value}
        onChange={onChange}

      />
      <label htmlFor={id} className="text-sm font-bold my-3 flex items-center text-foreground">
        {label}
        <span className="ml-3 text-destructive pt-1">{add}</span>
      </label>
    </div>
  );
} else if (type === "file") {
  inputField = (
    <>
      <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center text-foreground">
        {label}
        <span className="ml-3 text-destructive pt-1">{add}</span>
      </label>
      <input
        type="file"
        id={id}
        onChange={onChange}
        className="border rounded border-input w-full focus:outline-none h-10 pl-2 bg-background text-foreground"
        multiple
      />
    </>
  );
} else {
  inputField = (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-bold my-3 flex items-center text-foreground">
        {label}
        <span className="ml-3 text-destructive pt-1">{add}</span>
      </label>
      <input
        type={type==='password'&&showPassword?'text':type}
        id={id}
        value={inputValue}
        onChange={onChange}
        className="border rounded border-input w-full focus:outline-none h-10 pl-2 bg-background text-foreground placeholder:text-muted-foreground"
        pattern={pattern}
        inputMode={inputMode}
      />
      {type==="password"?<button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 -translate-y-1/2 top-1/2" onClick={()=>setShowPassword(prev=>!prev)}><FontAwesomeIcon icon={showPassword?faEyeSlash:faEye} className="h-4 w-4 "/></button>:''}
    </div>
  );
}

return <div className="text-left">{inputField}</div>;

}
