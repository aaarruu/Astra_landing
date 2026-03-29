import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
    const supabase = createClient('https://tftyiztfcvsikmlrovmy.supabase.co', 'sb_publishable_YNibZItiV-aNy5Y5OxIZbg_45CiJSkF')

    document.getElementById('contactForm').onsubmit = function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
		const message = document.getElementById('message').value

        if (name === "" || email === "" || phone === "" || message === "") {
            alert('Заполните все поля!')
            return
        }

        if (!email.includes('@')) {
            alert('Email должен содержать @')
            return
        }

        supabase.from('messages').insert([{ name: name, email: email, phone: phone, message: message  }])
            .then(result => {
                if (result.error) {
                    alert('Ошибка!')
                } else {
                    alert('Отправлено!')
                    document.getElementById('contactForm').reset()
                }
            })
    }
