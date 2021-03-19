const isTailorMadePlan = (planType) => {
  const TAILORMADE = "tailormade";
  return planType === TAILORMADE;
};

const app = {
  options: null,
  constructInstallmentsQueryString: function () {
    const OTHER = "other";
    let plansEndpoint = "/plans?";
    let holderDob = "holder_dob=" + this.holderDateOfBirth();
    let productTypeBESPOKE = "&product_type=BESPOKE";
    let funeralType =
      "&funeral_type=" + this.options.funeral.type.toUpperCase();
    let setPlanType = "&set_plan_type=" + this.options.plan.tier.toUpperCase();
    let thirdParty = this.options.thirdParty
    let thirdPartyProductCost =
      "&third_party_product_cost=" + thirdParty.price;

    let getInstallments = plansEndpoint + holderDob + funeralType;
    if (isTailorMadePlan(this.options.plan.type)) {
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
console.log(app.constructInstallmentsQueryString());

module.exports = { app };
function nonTailorMadeQueryString(setPlanType, thirdParty) {
  let thirdPartyProductCost2 =
  "&third_party_product_cost=" + thirdParty.price;
  const OTHER = "other";
  let productTypeSET = "&product_type=SET";
  let getInstallments = productTypeSET + setPlanType;
  if (thirdParty.selected === OTHER) {
    getInstallments += thirdPartyProductCost2;
  }
  return getInstallments;
}
