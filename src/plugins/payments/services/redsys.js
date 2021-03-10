const Redsys = require('node-redsys-api').Redsys

class Payment {
  createParamsToCreatePayment (total, orderId, tpvInfo) {
    const redsys = new Redsys()
    const mParams = {
      DS_MERCHANT_AMOUNT: total,
      DS_MERCHANT_CURRENCY: tpvInfo.currency,
      DS_MERCHANT_MERCHANTCODE: tpvInfo.fucCode,
      DS_MERCHANT_MERCHANTURL: tpvInfo.redirect_urls.callbackBasePath + '/' + orderId,
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_TERMINAL: tpvInfo.terminal,
      DS_MERCHANT_TRANSACTIONTYPE: tpvInfo.transaction_type,
      DS_MERCHANT_URLOK: tpvInfo.redirect_urls.urlOK + '/' + orderId,
      DS_MERCHANT_URLKO: tpvInfo.redirect_urls.urlKO + '/' + orderId
    }

    return {
      urlForm: tpvInfo.url,
      DS_SIGNATUREVERSION: tpvInfo.typeSecret,
      DS_SIGNATURE: redsys.createMerchantSignature(tpvInfo.secret, mParams),
      DS_MERCHANTPARAMETERS: redsys.createMerchantParameters(mParams)
    }
  }

  isValid (tpvResponse) {
    if (!(tpvResponse.DS_MERCHANTPARAMETERS || tpvResponse.Ds_MerchantParameters)) {
      return false
    }
    if (!(tpvResponse.DS_SIGNATURE || tpvResponse.Ds_Signature)) {
      return false
    }
    return true
  }

  paymentIsSuccess (tpvResponse, secret) {
    if (!this.isValid(tpvResponse)) {
      return { isOkay: false }
    }
    const redsys = new Redsys()
    const merchantParams = tpvResponse.DS_MERCHANTPARAMETERS || tpvResponse.Ds_MerchantParameters
    const signature = tpvResponse.DS_SIGNATURE || tpvResponse.Ds_Signature
    const merchantParamsDecoded = redsys.decodeMerchantParameters(merchantParams)
    const merchantSignatureNotif = redsys.createMerchantSignatureNotif(secret, merchantParams)
    const dsResponse = parseInt(merchantParamsDecoded.Ds_Response || merchantParamsDecoded.DS_RESPONSE)
    if (
      redsys.merchantSignatureIsValid(signature, merchantSignatureNotif) &&
      dsResponse > -1 &&
      dsResponse < 100
    ) {
      return {
        data: merchantParamsDecoded,
        isOkay: true
      }
    } else {
      return { isOkay: false }
    }
  }
}

module.exports = Payment
