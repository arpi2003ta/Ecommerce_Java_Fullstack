import React, { useEffect, useRef, useState } from 'react'

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(window.Razorpay)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(window.Razorpay)
    script.onerror = () => resolve(null)
    document.body.appendChild(script)
  })
}

const RazorpayCheckout = ({ amount = 0, currency = 'INR', name, description, onSuccess, onFailure }) => {
  const [razorpay, setRazorpay] = useState(null)
  const [loading, setLoading] = useState(true)
  const razorpayRef = useRef(null)

  useEffect(() => {
    loadRazorpayScript().then(Razorpay => {
      setRazorpay(Razorpay)
      setLoading(false)
    })
  }, [])

  const openCheckout = () => {
    if (!razorpay || loading) return
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: Math.round(amount * 100),
      currency,
      name: name || 'Zosh',
      description: description || 'Order Payment',
      handler: (response) => {
        onSuccess?.(response)
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#9155fd',
      },
    }
    const rzp = new razorpay(options)
    razorpayRef.current = rzp
    rzp.open()
    rzp.on('payment.failed', (response) => {
      onFailure?.(response)
    })
  }

  // Expose to window for imperative trigger from parent
  useEffect(() => {
    window.__razorpay = { openCheckout, isLoading: loading }
    return () => { window.__razorpay = undefined }
  }, [loading])

  return null
}

export default RazorpayCheckout
