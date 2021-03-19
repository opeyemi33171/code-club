const isTailorMadePlan = (planType) => {
  const TAILORMADE = "tailormade";
  return planType === TAILORMADE;
};

const app = {
  options: null,
  constructInstallmentsQueryString: function () {
    let plansEndpoint = "/plans?";
    
    let funeralType =
      "&funeral_type=" + this.options.funeral.type.toUpperCase();
    let setPlanType = "&set_plan_type=" + this.options.plan.tier.toUpperCase();

    let getInstallments = plansEndpoint;
    getInstallments += this.getQueryString(funeralType);
    if (isTailorMadePlan(this.options.plan.type)){
      let productTypeBESPOKE = "&product_type=BESPOKE";
      getInstallments += productTypeBESPOKE;
    } else {
      getInstallments += nonTailorMadeQueryString(setPlanType, this.options.thirdParty);
    }

    if (this.options.details.is_client === false) {
      let forPayer = "&for_purchaser=N";
      let payerDob = "&purchaser_dob=" + this.payerDateOfBirth();
      getInstallments += forPayer + payerDob;
    } else {
      let forPayer = "&for_purchaser=Y";
      getInstallments += forPayer;
    }

    return getInstallments;
  },
  getQueryString(funeralType) {
    let holderDob2 = "holder_dob=" + this.holderDateOfBirth();
    return holderDob2 + funeralType;
  },
  holderDateOfBirth() {
    let formattedDateOfBirth = this.options.details.date_of_birth.split("/");
    let holderDateOfBirth = new Date(
      formattedDateOfBirth[2],
      formattedDateOfBirth[1] - 1,
      formattedDateOfBirth[0]
    );

    return holderDateOfBirth.toJSON().substring(0, 10);
  },
  payerDateOfBirth() {
    let formattedDateOfBirth = this.options.details.payer.date_of_birth.split(
      "/"
    );
    let payerDateOfBirth = new Date(
      formattedDateOfBirth[2],
      formattedDateOfBirth[1] - 1,
      formattedDateOfBirth[0]
    );

    return payerDateOfBirth.toJSON().substring(0, 10);
  },
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

function nonTailorMadeQueryString(setPlanType, thirdParty) {
  const OTHER = "other";
  let getInstallments = `&product_type=SET${setPlanType}`;
  if (thirdParty.selected === OTHER) {
    getInstallments += `&third_party_product_cost=${thirdParty.price}`;
  }
  return getInstallments;
}
