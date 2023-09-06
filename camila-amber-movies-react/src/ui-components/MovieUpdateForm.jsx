/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getMovie } from "../graphql/queries";
import { updateMovie } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function MovieUpdateForm(props) {
  const {
    id: idProp,
    movie: movieModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    plot: "",
    genres: [],
    runtime: "",
    cast: [],
    poster: "",
    title: "",
    fullplot: "",
    languages: [],
    released: "",
    directors: [],
    rated: "",
    year: "",
    imdb: "",
    countries: [],
    tomatoes: "",
  };
  const [plot, setPlot] = React.useState(initialValues.plot);
  const [genres, setGenres] = React.useState(initialValues.genres);
  const [runtime, setRuntime] = React.useState(initialValues.runtime);
  const [cast, setCast] = React.useState(initialValues.cast);
  const [poster, setPoster] = React.useState(initialValues.poster);
  const [title, setTitle] = React.useState(initialValues.title);
  const [fullplot, setFullplot] = React.useState(initialValues.fullplot);
  const [languages, setLanguages] = React.useState(initialValues.languages);
  const [released, setReleased] = React.useState(initialValues.released);
  const [directors, setDirectors] = React.useState(initialValues.directors);
  const [rated, setRated] = React.useState(initialValues.rated);
  const [year, setYear] = React.useState(initialValues.year);
  const [imdb, setImdb] = React.useState(initialValues.imdb);
  const [countries, setCountries] = React.useState(initialValues.countries);
  const [tomatoes, setTomatoes] = React.useState(initialValues.tomatoes);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = movieRecord
      ? { ...initialValues, ...movieRecord }
      : initialValues;
    setPlot(cleanValues.plot);
    setGenres(cleanValues.genres ?? []);
    setCurrentGenresValue("");
    setRuntime(cleanValues.runtime);
    setCast(cleanValues.cast ?? []);
    setCurrentCastValue("");
    setPoster(cleanValues.poster);
    setTitle(cleanValues.title);
    setFullplot(cleanValues.fullplot);
    setLanguages(cleanValues.languages ?? []);
    setCurrentLanguagesValue("");
    setReleased(cleanValues.released);
    setDirectors(cleanValues.directors ?? []);
    setCurrentDirectorsValue("");
    setRated(cleanValues.rated);
    setYear(cleanValues.year);
    setImdb(cleanValues.imdb);
    setCountries(cleanValues.countries ?? []);
    setCurrentCountriesValue("");
    setTomatoes(cleanValues.tomatoes);
    setErrors({});
  };
  const [movieRecord, setMovieRecord] = React.useState(movieModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMovie,
              variables: { id: idProp },
            })
          )?.data?.getMovie
        : movieModelProp;
      setMovieRecord(record);
    };
    queryData();
  }, [idProp, movieModelProp]);
  React.useEffect(resetStateValues, [movieRecord]);
  const [currentGenresValue, setCurrentGenresValue] = React.useState("");
  const genresRef = React.createRef();
  const [currentCastValue, setCurrentCastValue] = React.useState("");
  const castRef = React.createRef();
  const [currentLanguagesValue, setCurrentLanguagesValue] = React.useState("");
  const languagesRef = React.createRef();
  const [currentDirectorsValue, setCurrentDirectorsValue] = React.useState("");
  const directorsRef = React.createRef();
  const [currentCountriesValue, setCurrentCountriesValue] = React.useState("");
  const countriesRef = React.createRef();
  const validations = {
    plot: [{ type: "Required" }],
    genres: [{ type: "Required" }],
    runtime: [{ type: "Required" }],
    cast: [{ type: "Required" }],
    poster: [],
    title: [{ type: "Required" }],
    fullplot: [],
    languages: [],
    released: [],
    directors: [{ type: "Required" }],
    rated: [],
    year: [],
    imdb: [],
    countries: [],
    tomatoes: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          plot,
          genres,
          runtime,
          cast,
          poster: poster ?? null,
          title,
          fullplot: fullplot ?? null,
          languages: languages ?? null,
          released: released ?? null,
          directors,
          rated: rated ?? null,
          year: year ?? null,
          imdb: imdb ?? null,
          countries: countries ?? null,
          tomatoes: tomatoes ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateMovie,
            variables: {
              input: {
                id: movieRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MovieUpdateForm")}
      {...rest}
    >
      <TextField
        label="Plot"
        isRequired={true}
        isReadOnly={false}
        value={plot}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              plot: value,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.plot ?? value;
          }
          if (errors.plot?.hasError) {
            runValidationTasks("plot", value);
          }
          setPlot(value);
        }}
        onBlur={() => runValidationTasks("plot", plot)}
        errorMessage={errors.plot?.errorMessage}
        hasError={errors.plot?.hasError}
        {...getOverrideProps(overrides, "plot")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              plot,
              genres: values,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            values = result?.genres ?? values;
          }
          setGenres(values);
          setCurrentGenresValue("");
        }}
        currentFieldValue={currentGenresValue}
        label={"Genres"}
        items={genres}
        hasError={errors?.genres?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("genres", currentGenresValue)
        }
        errorMessage={errors?.genres?.errorMessage}
        setFieldValue={setCurrentGenresValue}
        inputFieldRef={genresRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Genres"
          isRequired={true}
          isReadOnly={false}
          value={currentGenresValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.genres?.hasError) {
              runValidationTasks("genres", value);
            }
            setCurrentGenresValue(value);
          }}
          onBlur={() => runValidationTasks("genres", currentGenresValue)}
          errorMessage={errors.genres?.errorMessage}
          hasError={errors.genres?.hasError}
          ref={genresRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "genres")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Runtime"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={runtime}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime: value,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.runtime ?? value;
          }
          if (errors.runtime?.hasError) {
            runValidationTasks("runtime", value);
          }
          setRuntime(value);
        }}
        onBlur={() => runValidationTasks("runtime", runtime)}
        errorMessage={errors.runtime?.errorMessage}
        hasError={errors.runtime?.hasError}
        {...getOverrideProps(overrides, "runtime")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast: values,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            values = result?.cast ?? values;
          }
          setCast(values);
          setCurrentCastValue("");
        }}
        currentFieldValue={currentCastValue}
        label={"Cast"}
        items={cast}
        hasError={errors?.cast?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("cast", currentCastValue)
        }
        errorMessage={errors?.cast?.errorMessage}
        setFieldValue={setCurrentCastValue}
        inputFieldRef={castRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Cast"
          isRequired={true}
          isReadOnly={false}
          value={currentCastValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.cast?.hasError) {
              runValidationTasks("cast", value);
            }
            setCurrentCastValue(value);
          }}
          onBlur={() => runValidationTasks("cast", currentCastValue)}
          errorMessage={errors.cast?.errorMessage}
          hasError={errors.cast?.hasError}
          ref={castRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "cast")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Poster"
        isRequired={false}
        isReadOnly={false}
        value={poster}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster: value,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.poster ?? value;
          }
          if (errors.poster?.hasError) {
            runValidationTasks("poster", value);
          }
          setPoster(value);
        }}
        onBlur={() => runValidationTasks("poster", poster)}
        errorMessage={errors.poster?.errorMessage}
        hasError={errors.poster?.hasError}
        {...getOverrideProps(overrides, "poster")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title: value,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Fullplot"
        isRequired={false}
        isReadOnly={false}
        value={fullplot}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot: value,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.fullplot ?? value;
          }
          if (errors.fullplot?.hasError) {
            runValidationTasks("fullplot", value);
          }
          setFullplot(value);
        }}
        onBlur={() => runValidationTasks("fullplot", fullplot)}
        errorMessage={errors.fullplot?.errorMessage}
        hasError={errors.fullplot?.hasError}
        {...getOverrideProps(overrides, "fullplot")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages: values,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            values = result?.languages ?? values;
          }
          setLanguages(values);
          setCurrentLanguagesValue("");
        }}
        currentFieldValue={currentLanguagesValue}
        label={"Languages"}
        items={languages}
        hasError={errors?.languages?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("languages", currentLanguagesValue)
        }
        errorMessage={errors?.languages?.errorMessage}
        setFieldValue={setCurrentLanguagesValue}
        inputFieldRef={languagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Languages"
          isRequired={false}
          isReadOnly={false}
          value={currentLanguagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.languages?.hasError) {
              runValidationTasks("languages", value);
            }
            setCurrentLanguagesValue(value);
          }}
          onBlur={() => runValidationTasks("languages", currentLanguagesValue)}
          errorMessage={errors.languages?.errorMessage}
          hasError={errors.languages?.hasError}
          ref={languagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "languages")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Released"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={released}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released: value,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.released ?? value;
          }
          if (errors.released?.hasError) {
            runValidationTasks("released", value);
          }
          setReleased(value);
        }}
        onBlur={() => runValidationTasks("released", released)}
        errorMessage={errors.released?.errorMessage}
        hasError={errors.released?.hasError}
        {...getOverrideProps(overrides, "released")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors: values,
              rated,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            values = result?.directors ?? values;
          }
          setDirectors(values);
          setCurrentDirectorsValue("");
        }}
        currentFieldValue={currentDirectorsValue}
        label={"Directors"}
        items={directors}
        hasError={errors?.directors?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("directors", currentDirectorsValue)
        }
        errorMessage={errors?.directors?.errorMessage}
        setFieldValue={setCurrentDirectorsValue}
        inputFieldRef={directorsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Directors"
          isRequired={true}
          isReadOnly={false}
          value={currentDirectorsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.directors?.hasError) {
              runValidationTasks("directors", value);
            }
            setCurrentDirectorsValue(value);
          }}
          onBlur={() => runValidationTasks("directors", currentDirectorsValue)}
          errorMessage={errors.directors?.errorMessage}
          hasError={errors.directors?.hasError}
          ref={directorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "directors")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Rated"
        isRequired={false}
        isReadOnly={false}
        value={rated}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated: value,
              year,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.rated ?? value;
          }
          if (errors.rated?.hasError) {
            runValidationTasks("rated", value);
          }
          setRated(value);
        }}
        onBlur={() => runValidationTasks("rated", rated)}
        errorMessage={errors.rated?.errorMessage}
        hasError={errors.rated?.hasError}
        {...getOverrideProps(overrides, "rated")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year: value,
              imdb,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Imdb"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={imdb}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb: value,
              countries,
              tomatoes,
            };
            const result = onChange(modelFields);
            value = result?.imdb ?? value;
          }
          if (errors.imdb?.hasError) {
            runValidationTasks("imdb", value);
          }
          setImdb(value);
        }}
        onBlur={() => runValidationTasks("imdb", imdb)}
        errorMessage={errors.imdb?.errorMessage}
        hasError={errors.imdb?.hasError}
        {...getOverrideProps(overrides, "imdb")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries: values,
              tomatoes,
            };
            const result = onChange(modelFields);
            values = result?.countries ?? values;
          }
          setCountries(values);
          setCurrentCountriesValue("");
        }}
        currentFieldValue={currentCountriesValue}
        label={"Countries"}
        items={countries}
        hasError={errors?.countries?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("countries", currentCountriesValue)
        }
        errorMessage={errors?.countries?.errorMessage}
        setFieldValue={setCurrentCountriesValue}
        inputFieldRef={countriesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Countries"
          isRequired={false}
          isReadOnly={false}
          value={currentCountriesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.countries?.hasError) {
              runValidationTasks("countries", value);
            }
            setCurrentCountriesValue(value);
          }}
          onBlur={() => runValidationTasks("countries", currentCountriesValue)}
          errorMessage={errors.countries?.errorMessage}
          hasError={errors.countries?.hasError}
          ref={countriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "countries")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Tomatoes"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={tomatoes}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              plot,
              genres,
              runtime,
              cast,
              poster,
              title,
              fullplot,
              languages,
              released,
              directors,
              rated,
              year,
              imdb,
              countries,
              tomatoes: value,
            };
            const result = onChange(modelFields);
            value = result?.tomatoes ?? value;
          }
          if (errors.tomatoes?.hasError) {
            runValidationTasks("tomatoes", value);
          }
          setTomatoes(value);
        }}
        onBlur={() => runValidationTasks("tomatoes", tomatoes)}
        errorMessage={errors.tomatoes?.errorMessage}
        hasError={errors.tomatoes?.hasError}
        {...getOverrideProps(overrides, "tomatoes")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || movieModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || movieModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
