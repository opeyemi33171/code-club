const { expect, it, beforeEach } = require('@jest/globals')
const { app }= require('./index.js')


describe('construct instalment query string', () => {
    beforeEach(() => {
        app.options = {
            details: {
                is_client: false,
                'date_of_birth': '30/2/1970',
                payer: {
                    'date_of_birth': '10/01/1980'
                }
            },
            funeral: {
                type: 'BURIAL' // BURIAL or CREMATION
            },
            plan: {
                tier: '', // 'simple', 'bronze' 'silver' 'gold'
                type: 'tailormade' // tailormade or other
            },
            thirdParty: {
                price: 0
            }
        }
    })

    it('returns correct default string', () => {
        const expected = "/plans?holder_dob=1970-03-01&funeral_type=BURIAL&product_type=BESPOKE&for_purchaser=N&purchaser_dob=1980-01-10"
        expect(app.constructInstallmentsQueryString()).toBe(expected)
    })

    it('returns query string for non tailor-made plan', () => {
        app.options.plan.type = 'other';
        app.options.thirdParty.selected = 'not-other';
        app.options.details.is_client = true;
        const expected = "/plans?holder_dob=1970-03-01&funeral_type=BURIAL&product_type=SET&set_plan_type=&for_purchaser=Y"
        expect(app.constructInstallmentsQueryString()).toBe(expected)
    })

    it("returns query string for non tailor-made plan and client is false", () => {
        app.options.plan.type = 'other';
        app.options.thirdParty.selected = 'not-other';
        const expected = "/plans?holder_dob=1970-03-01&funeral_type=BURIAL&product_type=SET&set_plan_type=&for_purchaser=N&purchaser_dob=1980-01-10"
        expect(app.options.details.is_client).toBe(false)
        expect(app.constructInstallmentsQueryString()).toBe(expected)
    });

    it("returns query string for tailor-made plan and client is false", () => {
        app.options.plan.type = 'tailormade';
        const expected = "/plans?holder_dob=1970-03-01&funeral_type=BURIAL&product_type=BESPOKE&for_purchaser=N&purchaser_dob=1980-01-10"
        expect(app.options.details.is_client).toBe(false)
        expect(app.constructInstallmentsQueryString()).toBe(expected)
    });

    it("returns query string for non tailor-made plan, client is false and selected third party is other", () => {
        app.options.plan.type = 'other';
        app.options.thirdParty.selected = 'other';
        const expected = "/plans?holder_dob=1970-03-01&funeral_type=BURIAL&product_type=SET&set_plan_type=&third_party_product_cost=0&for_purchaser=N&purchaser_dob=1980-01-10"
        expect(app.options.details.is_client).toBe(false)
        expect(app.constructInstallmentsQueryString()).toBe(expected)
    });

}) 
