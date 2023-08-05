import {useForm} from "react-hook-form";
import "../../scss/contacts-form.scss";

function ContactsForm(props) {
  const {handleSubmit, register, formState: {errors}} = useForm();

  function onSubmit(values) {
    alert(values.email + ' ' + values.password);
  }

  return (
      <form className={props.classForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="form_item form_item__name">
          <input
              className={errors.name ? 'error' : ''}
              type="text"
              placeholder="Ім'я"
              {...register("name", {
                required: "Required",
                pattern: {
                  value: /[A-Za-zА-Яа-яЁё]{3,}/,
                  message: 'Incorrect name',
                }
              })}
          />
          <p className="error_message">{errors.name && errors.name.message}</p>
        </div>
        <div className="form_item form_item__email">
          <input
              className={errors.email ? 'error' : ''}
              type="email"
              placeholder="Електронна пошта"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                }
              })}
          />
          <p className="error_message">{errors.email && errors.email.message}</p>
        </div>
        <div className="form_item form_item__subject">
          <input
              className={errors.subject ? 'error' : ''}
              type="text"
              placeholder="Тема"
              {...register("subject", {
                pattern: {
                  value: /[A-Za-zА-Яа-яЁё0-9._%+-]{3,}/,
                  message: 'Incorrect subject',
                }
              })}
          />
          <p className="error_message">{errors.subject && errors.subject.message}</p>
        </div>
        <div className="form_item form_item__message">
          <textarea
              className={errors.message ? 'error' : ''}
              placeholder="Введіть своє повідомлення..."
              {...register("message", {
                pattern: {
                  value: /[A-Za-zА-Яа-яЁё]{3,}/,
                  message: 'Incorrect message',
                }
              })}
          />
          <p className="error_message">{errors.message && errors.message.message}</p>
        </div>
        <button type="submit" className="form_submit">Надіслати</button>
      </form>
  );
}

export default ContactsForm;
