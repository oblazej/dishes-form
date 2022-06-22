import Head from 'next/head';
import Form from '../components/form/Form';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {
  const submit = values => {
    // print the form values to the console
    console.log(values)
    const body = {"name": values.name, "preparation_time": `${values.hours}:${values.minutes}:${values.seconds}`,
                  "type": values.type};
    switch(values.type) {
      case "pizza":
        body.diameter = parseInt(values.diameter);
        body.no_of_slices = parseInt(values.noOfSlices);
        break;
      case "soup":
        body.spiciness_scale = parseInt(values.spicinessScale);
        break;
      case "sandwich":
        body.slices_of_bread = parseInt(values.slicesOfBread);
        break;
      default:
        return;
    }
    console.log(body)
    axios.post("https://frosty-wood-6558.getsandbox.com:443/dishes", body).then(response => {
      console.log(response.data)
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Dishes Form</title>
        <meta name="description" content="Dishes Form"/>
      </Head>

      <main className={styles.main}>
        <Form onSubmit={submit}/>
      </main>

    </div>
  )
}
