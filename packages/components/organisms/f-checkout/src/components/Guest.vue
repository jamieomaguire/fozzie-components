<template>
    <div
        data-test-id="guest-component"
        :class="$style['c-guest']">
        <form-field
            :value="customer.firstName"
            aria-describedby="first-name-error"
            :aria-invalid="isFirstNameEmpty"
            name="guest-first-name"
            maxlength="100"
            :label-text="$t('guest.firstName')"
            :has-error="isFirstNameEmpty"
            @input="updateCustomerDetails({ 'firstName': $event })">
            <template #error>
                <error-message
                    v-if="isFirstNameEmpty"
                    id="first-name-error"
                    data-js-error-message
                    data-test-id="error-first-name-empty">
                    {{ $t('validationMessages.firstName.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            :value="customer.lastName"
            name="guest-last-name"
            maxlength="100"
            :label-text="$t('guest.lastName')"
            aria-describedby="last-name-error"
            :aria-invalid="isLastNameEmpty"
            :has-error="isLastNameEmpty"
            @input="updateCustomerDetails({ 'lastName': $event })">
            <template #error>
                <error-message
                    v-if="isLastNameEmpty"
                    id="last-name-error"
                    data-js-error-message
                    data-test-id="error-last-name-empty">
                    {{ $t('validationMessages.lastName.requiredError') }}
                </error-message>
            </template>
        </form-field>

        <form-field
            :value="customer.email"
            name="guest-email"
            input-type="email"
            maxlength="50"
            :label-text="$t('guest.email')"
            :has-error="!isEmailValid"
            aria-describedby="email-error"
            :aria-invalid="!isEmailValid"
            @blur="formFieldBlur('email')"
            @input="updateCustomerDetails({ 'email': $event })">
            <template #error>
                <error-message
                    v-if="!isEmailValid"
                    id="email-error"
                    data-js-error-message
                    data-test-id="error-email-invalid">
                    {{ $t('validationMessages.email.requiredError') }}
                </error-message>
            </template>
        </form-field>
    </div>
</template>

<script>
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { mapState, mapActions } from 'vuex';
import checkoutValidationsMixin from '../mixins/validations.mixin';
import { VALIDATIONS, VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: { FormField, ErrorMessage },

    mixins: [checkoutValidationsMixin],

    /*
    * Provide/Inject allows nested `Guest` component to inherit `Checkout`
    * validator scope, `$v`.
    */
    inject: ['$v'],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'customer'
        ]),

        /*
        * Validation methods return true if the validation conditions
        * have not been met and the field has been `touched` by a user.
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        */
        isFirstNameEmpty () {
            return this.isFieldEmpty(VALIDATIONS.guest, 'firstName');
        },

        isLastNameEmpty () {
            return this.isFieldEmpty(VALIDATIONS.guest, 'lastName');
        },

        isEmailValid () {
            return (!this.$v[VALIDATIONS.guest].email.$dirty || this.isValidEmailAddress()) && !this.isFieldEmpty(VALIDATIONS.guest, 'email');
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateCustomerDetails'
        ]),

        formFieldBlur (field) {
            const fieldValidation = this.$v[VALIDATIONS.guest][field];
            if (fieldValidation) {
                fieldValidation.$touch();
            }
        },

        isValidEmailAddress () {
            return this.$v[VALIDATIONS.guest].email.email;
        }
    }
};
</script>

<style lang="scss" module>
.c-guest {
    margin-bottom: spacing(x2);
}
</style>
