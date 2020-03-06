import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby';

import styles from './Form.module.scss';

const Form = () => {
  const attachmentInput = useRef(null);
  const [data, setData] = useState({
    name: {
      value: '',
      valid: false,
    },
    company: {
      value: '',
      valid: false,
    },
    email: {
      value: '',
      valid: false,
    },
    message: {
      value: '',
      valid: false,
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setData(data => ({
      ...data,
      [name]: {
        valid: name === 'email' ? isCompanyEmailValid(value) : value,
        value: value,
      },
    }));
  };

  const [isValid, setIsValid] = useState(true);
  const [filesList, setFilesList] = useState([]);

  const fileAccept =
    '.png,.jpg,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const isCompanyEmailValid = email => {
    const regexp = new RegExp(/[^@]+@[^.]+\..+/g);
    return regexp.test(email);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const valid =
      data.name.valid &&
      isCompanyEmailValid(data.email.value) &&
      data.message.valid;

    setIsValid(valid);

    // const id = process.env.GATSBY_CONTACT_FORM_ID;
    const id = 'q2SCcZ73tL2W190WUs0LO';
    const url = `https://submit-form.com/${id}`;

    const body = JSON.stringify({
      name: data.name.value,
      company: data.company.value,
      email: data.email.value,
      message: data.message.value,
    });

    valid &&
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(response => {
          if (response.ok) {
            navigate('/thanks');
          } else {
            navigate('/error');
          }
        })
        .catch(() => {
          navigate('/error');
        });
  };

  const handleInputFileChange = async e => {
    const mergedFilesList = [...e.target.files];
    setFilesList(mergedFilesList);
  };

  const handleFileClear = async () => {
    setFilesList([]);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <h3 className={styles.formTitle}>REQUEST A QUOTE</h3>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${
              !isValid && !data.name.valid ? styles.error : ''
            } ${data.name.valid ? styles.focused : ''}`}
            type="text"
            name="name"
            id="name"
            require="true"
            onChange={handleChange}
          />
          <label className={styles.placeholder} htmlFor="name">
            Full Name
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${
              data.company.valid ? styles.focused : ''
            }`}
            type="text"
            name="company"
            id="company"
            onChange={handleChange}
          ></input>
          <label className={styles.placeholder} htmlFor="company">
            Company
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${
              !isValid && !data.email.valid ? styles.error : ''
            } ${data.email.value.length ? styles.focused : ''}`}
            type="text"
            name="email"
            id="email"
            require="true"
            onChange={handleChange}
          />
          <label className={styles.placeholder} htmlFor="email">
            Email
          </label>
        </div>
        <h3 className={`${styles.formTitle} ${styles.formTitleMobile}`}>
          Message
        </h3>
        <div className={styles.textareaWrapper}>
          <textarea
            className={`${styles.textarea} ${
              !isValid && !data.message.valid ? styles.error : ''
            } ${data.message.valid ? styles.focused : ''}`}
            name="message"
            id="message"
            require="true"
            onChange={handleChange}
          ></textarea>
          <label className={styles.placeholder} htmlFor="message">
            What is your project about?
          </label>
          <div className={styles.block}></div>
          <div
            className={`${styles.attachmentWrapper} ${
              filesList.length ? styles.attached : ''
            }`}
          >
            <label
              className={styles.attachmentLabel}
              htmlFor="attachment-file"
            ></label>
            <input
              className={styles.attachmentFile}
              type="file"
              name="quote-file"
              id="attachment-file"
              ref={attachmentInput}
              accept={fileAccept}
              onChange={handleInputFileChange}
            ></input>
            <div className={styles.attachmentName}>
              <button
                type="button"
                className={styles.attachmentButton}
                onClick={handleFileClear}
              ></button>
              {!!filesList.length && <span>{filesList[0].name}</span>}
            </div>
          </div>
        </div>
        <button className={styles.button} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Form;
