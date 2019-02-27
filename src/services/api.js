/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

const slugsMonth = [
  'January', 'February',
  'March', 'April', 'May',
  'June', 'July', 'August',
  'September', 'October', 'November',
  'December'];

export class Comic {
  constructor() {
    this.key = 'bc05deef3000d549c9687d236a02dfac0ec5aeb2';
    this.filedsCharacters = 'id,image,name,publisher,count_of_issue_appearances,api_detail_url';
    this.filedsCharacter = 'id,image,name,publisher,real_name,gender,date_last_updated,deck';
    this.defaultLimit = 6;
    this.addLimit = 6;
    this.offset = 0;
  }

  getCharacters = async () => {
    const option = `/api/characters/?api_key=${this.key}&format=json&field_list=${this.filedsCharacters}&limit=${this.defaultLimit}&offset=${this.offset}`;
    const response = await fetch(option);
    const { results } = await response.json();
    return this._transformCharacters(results);
  }

  getMoreCharacters = async () => {
    const option = `/api/characters/?api_key=${this.key}&format=json&field_list=${this.filedsCharacters}&limit=${this.addLimit}&offset=${this.offset += this.addLimit}`;
    const response = await fetch(option);
    const { results } = await response.json();
    return this._transformCharacters(results);
  }

  /**
   * @param {string|number} id
   */
  getCharacter = async (id) => {
    const option = `/api/character/${id}/?api_key=${this.key}&format=json&field_list=${this.filedsCharacter}`;
    const response = await fetch(option);
    const { results } = await response.json();
    return this._transformCharacter(results);
  }

  /**
   * @param {array} results
   * Transforms the result of the query into a convenient form for further work with it.
   */
  _transformCharacters = (results) => {
    const data = results.map(({
      id,
      api_detail_url,
      name,
      image: { super_url: image },
      publisher: { name: publisher },
      count_of_issue_appearances: issue,
    }) => {
      const arr = api_detail_url.split('/');
      const characterId = arr[arr.length - 2];

      return {
        id,
        characterId,
        name,
        image,
        publisher,
        issue,
      };
    });

    return data;
  }

  /**
   * @param {object} results
   * Transforms the result of the query into a convenient form for further work with it.
   */
  _transformCharacter = (results) => {
    const {
      id,
      image: { super_url: image },
      name,
      real_name: realName,
      gender,
      publisher: { name: publisher },
      date_last_updated: updated,
      deck: description,
    } = results;

    const unix = new Date(Date.parse(updated.split(' ')[0]));
    const month = unix.getMonth();
    const date = unix.getDate();
    const year = unix.getFullYear();

    const fields = [
      {
        id: 1,
        title: 'Real name:',
        current: realName,
      },
      {
        id: 2,
        title: 'Publisher:',
        current: publisher,
      },
      {
        id: 3,
        title: 'Gender:',
        current: gender,
      },
      {
        id: 4,
        title: 'Updated:',
        current: `${slugsMonth[month]} ${date}, ${year}`,
      },
    ];

    const data = Object.assign({}, {
      id,
      image,
      name,
      fields,
      description,
    });

    return data;
  }
}
