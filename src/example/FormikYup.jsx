import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Formik, replace} from 'formik';
import {Button, Input, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alan'),
    surname: Yup.string().required('Zorunlu Alan'),
    email: Yup.string()
      .required('Zorunlu Alan')
      .email('lütfen geçerli bir email adresi giriniz'),
    phone: Yup.string()
      .required('Zorunlu Alan')
      .min(11, 'lütfen minimum 11 hane olarak giriniz')
      .max(13, 'lütfen minimum 13 hane olarak giriniz'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/,
        'Şartlar sağlanmıyor!!!!',
      ),
    passwordConfirm: Yup.string()
      .required('Zorunlu Alan')
      .oneOf([Yup.ref('password')], 'şifreler uyuşmuyor'),
    agrementConfirm: Yup.bool()
      .required('Zorunlu Alan')
      .oneOf([true], 'Sözleşmeyi onaylamanız gerekiyor'),
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          backgroundColor: '#00E096',
          minHeight: 125,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          KAYIT OLUŞTUR
        </Text>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              agrementConfirm: false,
            }}
            validationSchema={registerSchema}
            onSubmit={values =>
              Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))
            }>
            {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'İsim'}
                  placeholder="İsim bilgisi giriniz"
                  onChangeText={handleChange('name')}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Soyisim'}
                  placeholder="Soy isminizi giriniz"
                  onChangeText={handleChange('surname')}
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.surname}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'E-mail'}
                  placeholder="E-mail bilgisi giriniz.."
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Tel'}
                  placeholder="Telefon bilgisini giriniz"
                  onChangeText={handleChange('phone')}
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Şifre giriniz'}
                  placeholder="Şifrenizi giriniz"
                  onChangeText={handleChange('password')}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirm}
                  label={'Şifre Tekrar'}
                  placeholder="Şifrenizi tekrar giriniz"
                  onChangeText={handleChange('passwordConfirm')}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                  caption={errors.passwordConfirm}
                />
                <View>
                  <Toggle
                    onChange={value => setFieldValue('agrementConfirm', value)}
                    checked={values.agrementConfirm}>
                    Kullanıcı Sözleşmesini ve gizlilik Anlaşmasını kabul
                    ediyorum
                  </Toggle>
                  {errors.agrementConfirm && (
                    <Text style={{color: 'red', paddingTop: 15}}>
                      {errors.agrementConfirm}
                    </Text>
                  )}
                </View>

                <Button
                  style={{marginTop: 30}}
                  onPress={handleSubmit}
                  status="success">
                  kaydet
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
