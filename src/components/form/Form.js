import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import styles from '../../styles/Form.module.css';

function Form(props) {
    const { handleSubmit, type, spicinessScale } = props;

    const handleValueSelection = (event) => {
        const target = event.currentTarget;
        target.type = 'text';
        target.setSelectionRange(0, 1);
        target.type = 'number';
    }

    const durationInputFormat = (val, maxVal) => {
        if (val.length < 2) {
            return "0" + val;
        } else {
            const parsed = parseInt(val.substring(0, 2));
            if (parsed > 59) {
                return maxVal;
            }
        }
        return val.length > 2 ? val.substring(0, 2) : val;
    }

return (
    <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <Field className={styles.input} name="name" component="input" type="text" required />
            <label htmlFor="preparationTime">Preparation time:</label>
            <div className={styles["duration-container"]}>
                <Field className={styles["duration-input"]} name="hours" component="input" format={(val) => durationInputFormat(val, 99)}
                    type="number" min="0" max="99" step="1" onFocus={handleValueSelection} required />:
                <Field className={styles["duration-input"]} name="minutes" component="input" format={(val) => durationInputFormat(val, 59)} type="number" min="0" max="59" step="1" onFocus={handleValueSelection} required />:
                <Field className={styles["duration-input"]} name="seconds" component="input" format={(val) => durationInputFormat(val, 59)} type="number" min="0" max="59" step="1" onFocus={handleValueSelection} required />
        </div>
            <label htmlFor="type">Dish type:</label>
            <Field className={styles.input} name="type" component="select" required>
                <option value="def" disabled>select dish type</option>
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="sandwich">sandwich</option>
            </Field>
        {type === "pizza" && <>
            <label htmlFor="noOfSlices">Number of slices</label>
            <Field className={styles.input} name="noOfSlices" component="input" type="number" min="1" step="1" required />
            <label htmlFor="diameter">Diameter</label>
            <Field className={styles.input} name="diameter" component="input" type="number" min="1" step="0.1" required />
        </>}
        {type === "soup" && <>
            <label htmlFor="spicinessScale">Spiciness scale:</label>
            <div><Field className={styles.input} name="spicinessScale" component="input" type="range" min="1" max="10" step="1" required /> {spicinessScale || 5}</div>
        </>}
        {type === "sandwich" && <>
            <label htmlFor="slicesOfBread">Slices of bread:</label>
            <Field className={styles.input} name="slicesOfBread" component="input" type="number" min="1" required />
        </>}
        <button type="submit">Submit</button>
    </form>
);
}

Form = reduxForm({
    form: "dishes",
    initialValues: { hours: "00", minutes: "00", seconds: "00", type: "def", spicinessScale: "5" }
})(Form);

const selector = formValueSelector("dishes");

Form = connect(state => {
    const { type, spicinessScale } = selector(state, 'type', 'spicinessScale');
    return {
        type,
        spicinessScale
    };
})(Form);

export default Form;