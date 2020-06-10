describe("Create new item", () => {
	const item = { id: "1", name: "John" };
	let resp;

	beforeEach(async () => {
		resp = await cy.request("POST", "/", item);
	});

	it("HTTP status 200", () => {
		expect(resp.status).to.equal(200);
	});

	it("Returns item", () => {
		expect(JSON.stringify(resp.body)).to.equal(JSON.stringify(item));
	});

	it("Item should be created", () => {
		cy.request("/").then(({ body }) => {
			const itemExists = body.some(
				(obj) => obj.id == item.id && obj.name == item.name
			);
			expect(itemExists).to.equal(true);
		});
	});
});

describe("Update item", () => {
	const item = { id: "1", name: "Jane" };
	let resp;

	beforeEach(async () => {
		resp = await cy.request("POST", "/", item);
	});

	it("HTTP status 200", () => {
		expect(resp.status).to.equal(200);
	});

	it("Returns item", () => {
		expect(JSON.stringify(resp.body)).to.equal(JSON.stringify(item));
	});

	it("Item should be updated", () => {
		cy.request("/").then(({ body }) => {
			const itemInDB = body.find((obj) => obj.id == item.id);
			expect(itemInDB.name).to.equal(item.name);
		});
	});
});
