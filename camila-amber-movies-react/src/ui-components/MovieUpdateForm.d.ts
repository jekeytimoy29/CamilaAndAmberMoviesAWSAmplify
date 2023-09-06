/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MovieUpdateFormInputValues = {
    plot?: string;
    genres?: string[];
    runtime?: number;
    cast?: string[];
    poster?: string;
    title?: string;
    fullplot?: string;
    languages?: string[];
    released?: string;
    directors?: string[];
    rated?: string;
    year?: number;
    imdb?: number;
    countries?: string[];
    tomatoes?: number;
};
export declare type MovieUpdateFormValidationValues = {
    plot?: ValidationFunction<string>;
    genres?: ValidationFunction<string>;
    runtime?: ValidationFunction<number>;
    cast?: ValidationFunction<string>;
    poster?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    fullplot?: ValidationFunction<string>;
    languages?: ValidationFunction<string>;
    released?: ValidationFunction<string>;
    directors?: ValidationFunction<string>;
    rated?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    imdb?: ValidationFunction<number>;
    countries?: ValidationFunction<string>;
    tomatoes?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MovieUpdateFormOverridesProps = {
    MovieUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    plot?: PrimitiveOverrideProps<TextFieldProps>;
    genres?: PrimitiveOverrideProps<TextFieldProps>;
    runtime?: PrimitiveOverrideProps<TextFieldProps>;
    cast?: PrimitiveOverrideProps<TextFieldProps>;
    poster?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    fullplot?: PrimitiveOverrideProps<TextFieldProps>;
    languages?: PrimitiveOverrideProps<TextFieldProps>;
    released?: PrimitiveOverrideProps<TextFieldProps>;
    directors?: PrimitiveOverrideProps<TextFieldProps>;
    rated?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    imdb?: PrimitiveOverrideProps<TextFieldProps>;
    countries?: PrimitiveOverrideProps<TextFieldProps>;
    tomatoes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MovieUpdateFormProps = React.PropsWithChildren<{
    overrides?: MovieUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    movie?: any;
    onSubmit?: (fields: MovieUpdateFormInputValues) => MovieUpdateFormInputValues;
    onSuccess?: (fields: MovieUpdateFormInputValues) => void;
    onError?: (fields: MovieUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MovieUpdateFormInputValues) => MovieUpdateFormInputValues;
    onValidate?: MovieUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MovieUpdateForm(props: MovieUpdateFormProps): React.ReactElement;
