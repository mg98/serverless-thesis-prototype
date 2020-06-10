describe("Get all items", () => {
	let resp;

	beforeEach(async () => {
		resp = await cy.request("/");
	});

	it("HTTP status 200", () => {
		expect(resp.status).to.equal(200);
	});

	it("Returns an array", () => {
		expect(resp.body).to.be.an("array");
	});

	it("Items have valid structure", () => {
		resp.body.every((i) => expect(i).to.have.all.keys("id", "name"));
	});
});
