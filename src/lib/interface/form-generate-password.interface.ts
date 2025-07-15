export interface FormCheckboxValue {
	label: string;
	checked: boolean;
}

export interface FormCheckbox {
	includeUppercaseLetters: FormCheckboxValue;
	includeLowercaseLetters: FormCheckboxValue;
	includeNumbers: FormCheckboxValue;
	includeSymbols: FormCheckboxValue;
}

export interface FormGeneratePassword {
	passwordLength: number;
	settings: FormCheckbox;
	password: string;
}
