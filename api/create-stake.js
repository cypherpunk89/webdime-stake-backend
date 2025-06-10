
const { Xumm } = require('xumm-sdk');
require('dotenv').config();

const xumm = new Xumm(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

module.exports = async (req, res) => {
  try {
    const payload = {
      txjson: {
        TransactionType: 'Payment',
        Destination: 'rJd5h5PqSh7Y3gPkAYDrQUDTSukfKRVBNV',
        Amount: {
          currency: 'WDM',
          issuer: 'rphmS6GfDCgoR5jjqSTJ4dUvahm1TNPeY1',
          value: '100'
        },
        Memos: [
          {
            Memo: {
              MemoData: Buffer.from('WDM_Beta_Access').toString('hex')
            }
          }
        ]
      }
    };

    const response = await xumm.payload.create(payload);
    res.status(200).json({
      sign_url: response.next.always,
      qr: response.refs.qr_png
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payload creation failed' });
  }
};
