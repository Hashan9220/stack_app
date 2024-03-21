import AddUser from '../src/screen/Users';

it('Api test', async function () {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        json: function () {
          return {Id: 1};
        },
      });
    });
    return p;
  });
  const response = await AddUser.saveUser();
  expect(response.Id).toBe(1);
});
