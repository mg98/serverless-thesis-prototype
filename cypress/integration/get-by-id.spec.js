describe("Get item by id", async () => {
	// Put item
	const item = { id: "2", name: "Bob" };
	await cy.request("POST", "/", item);

	let resp;

	beforeEach(async () => {
		resp = await cy.request(`/${item.id}`);
	});

	it("HTTP status 200", () => {
		expect(resp.status).to.equal(200);
	});

	it("Item has valid structure", () => {
		resp.body.to.have.all.keys("id", "name");
	});

	it("Item has expected values", () => {
		expect(resp.body.id).to.equal(item.id);
		expect(resp.body.name).to.equal(item.name);
	});
});
