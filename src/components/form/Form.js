import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

function Form(props) {
    const { handleSubmit, type, spicinessScale } = props;

    const handleValueSelection = (event) => {
        const target = event.currentTarget;
        target.type = 'text';
        target.setSelectionRange(0, 1);
        target.type = 'number';
    }

    const durationInputFormat = (val, maxVal) => {
        if (parseInt(val) > maxVal) {
            return maxVal;
        }
        if (val.length < 2) {
            return "0" + val;
        } else {
            return val.length > 2 ? val.substring(0, 2) : val;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <Field name="name" component="input" type="text" required />
            </div>
            <div>
                <label htmlFor="preparationTime">Preparation time</label>
                <Field name="hours" component="input" format={(val) => durationInputFormat(val, 99)}
                type="number" min="0" max="99" step="1" onFocus={handleValueSelection} required />
                <Field name="minutes" component="input" format={(val) => durationInputFormat(val, 59)} type="number" min="0" max="59" step="1" onFocus={handleValueSelection} required />
                <Field name="seconds" component="input" format={(val) => durationInputFormat(val, 59)} type="number" min="0" max="59" step="1" onFocus={handleValueSelection} required />
            </div>
            <div>
                <label>Dish type</label>
                <Field name="type" component="select" required>
                    <option value="def" disabled>select dish type</option>
                    <option value="pizza">pizza</option>
                    <option value="soup">soup</option>
                    <option value="sandwich">sandwich</option>
                </Field>
            </div>
            {type === "pizza" && <div>
                <label htmlFor="noOfSlices">Number of slices</label>
                <Field name="noOfSlices" component="input" type="number" min="1" step="1" required />
                <label htmlFor="diameter">Diameter</label>
                <Field name="diameter" component="input" type="number" min="1" step="0.1" required />
            </div>}
            {type === "soup" && <div>
                <label htmlFor="spicinessScale">Spiciness scale</label>
                <Field name="spicinessScale" component="input" type="range" min="1" max="10" step="1" required /> {spicinessScale || 5}
            </div>}
            {type === "sandwich" && <div>
                <label htmlFor="slicesOfBread">Slices of bread</label>
                <Field name="slicesOfBread" component="input" type="number" min="1" required />
            </div>}
            <button type="submit">Submit</button>
        </form>
    );
}

Form = reduxForm({
    // a unique name for the form
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