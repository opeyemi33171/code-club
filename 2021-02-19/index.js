const isTailorMadePlan = (planType) => {
  const TAILORMADE = "tailormade";
  return planType === TAILORMADE;
};

const makeFirstQueryParam = (key, value) => `?${key}=${value}`
const makeQueryParam = (key, value) => `&${key}=${value}`

const NO = "N";
const YES = "Y";

const app = {
  options: null,
  constructInstallmentsQueryString: function () {
    const plansEndpoint = "/plans"
    return plansEndpoint + this.queryString();
  },

  queryString(){
    const holderDateOfBirth = this.formatDateOfBirth(this.options.details.date_of_birth);
    const payerDateOfBirth = this.formatDateOfBirth(this.options.details.payer.date_of_birth);
    let getInstallments = makeFirstQueryParam("holder_dob", holderDateOfBirth);
    getInstallments += makeQueryParam('funeral_type', this.options.funeral.type.toUpperCase());

    if (isTailorMadePlan(this.options.plan.type)){
      getInstallments += makeQueryParam('product_type', 'BESPOKE');
    } else {
      const OTHER = "other";
      const thirdParty = this.options.thirdParty;
      getInstallments += makeQueryParam("product_type", `SET`);
      getInstallments += makeQueryParam("set_plan_type", this.options.plan.tier.toUpperCase());
      if (thirdParty.selected === OTHER) {
        getInstallments += makeQueryParam("third_party_product_cost", thirdParty.price);
      } 
    }

    if (this.options.details.is_client === false) {
      getInstallments += makeQueryParam('for_purchaser', NO)
      getInstallments += makeQueryParam('purchaser_dob', payerDateOfBirth);
    } else {
      getInstallments += makeQueryParam("for_purchaser", YES);
    }
    return getInstallments;
  },
  formatDateOfBirth(dateOfBirth) {
    const splitDateOfBirth = dateOfBirth.split(
      "/"
    );
    const formattedDateOfBirth = new Date(
      splitDateOfBirth[2],
      splitDateOfBirth[1] - 1,
      splitDateOfBirth[0]
    );

    return formattedDateOfBirth.toJSON().substring(0, 10);
  }
};

app.options = {
  details: {
    is_client: false,
    date_of_birth: "30/2/1970",
    payer: {
      date_of_birth: "10/01/1980",
    },
  },
  funeral: {
    type: "BURIAL", // BURIAL or CREMATION
  },
  plan: {
    tier: "", // 'simple', 'bronze' 'silver' 'gold'
    type: "tailormade", // tailormade or other
  },
  thirdParty: {
    price: 0,
  },
};

module.exports = { app };


