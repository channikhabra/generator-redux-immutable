import {Component} from 'react';
import styles from '../../css/app.css';

export default class Home extends Component {
  render() {
    // injected from the Sample reducer
    const {title} = this.props;
    return (
      <h1 className={styles.text}>Welcome {title}!</h1>
    );
  }
}
