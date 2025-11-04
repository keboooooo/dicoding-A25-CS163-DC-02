export function getMockQuestions() {
  return [
    {
      id: 1,
      question: "Result of concatenating the outputs",
      options: [
        "A single scalar value representing the overall attention score.",
        "A set of probabilities indicating the relevance of each input element.",
        "A matrix that combines the information from all heads.",
        "A reduced-dimensionality representation of the input sequence.",
      ],
      correct: "A matrix that combines the information from all heads.",
      feedbackWrong:
        "Jawaban Anda belum tepat. Pada multi-head attention, output dari tiap head (masing-masing berupa matriks) dikonkatenasi lalu diproyeksikan kembali, sehingga hasilnya adalah matriks yang menggabungkan informasi dari semua head—bukan skalar tunggal.",
      feedbackCorrect:
        "Output concat pada multi-head attention adalah matriks yang menyatukan hasil dari tiap head, biasanya berukuran seq_Len × (num_heads × d_v), kemudian diproyeksikan oleh layer linear untuk kembali ke dimensi model.",
    },
    {
      id: 2,
      question:
        "What is the purpose of the linear projection after concatenation in multi-head attention?",
      options: [
        "To reduce the number of attention heads.",
        "To combine all heads back into the original model dimension.",
        "To normalize attention scores.",
        "To convert the matrix into probabilities.",
      ],
      correct: "To combine all heads back into the original model dimension.",
      feedbackWrong:
        "Linear projection tidak digunakan untuk normalisasi atau pengurangan head, tetapi untuk mengembalikan hasil concatenation ke dimensi model semula.",
      feedbackCorrect:
        "Linear projection menggabungkan hasil dari semua head kembali ke dimensi model (biasanya d_model), menjaga konsistensi dimensi antar layer transformer.",
    },
    {
      id: 3,
      question:
        "Why is multi-head attention used instead of a single attention head?",
      options: [
        "Because multiple heads reduce computation time.",
        "Because multiple heads allow the model to attend to information from different representation subspaces.",
        "Because multiple heads increase the model's depth.",
        "Because multiple heads eliminate the need for positional encoding.",
      ],
      correct:
        "Because multiple heads allow the model to attend to information from different representation subspaces.",
      feedbackWrong:
        "Multi-head attention tidak untuk mengurangi waktu komputasi, tapi untuk menangkap konteks dari berbagai representasi subruang secara paralel.",
      feedbackCorrect:
        "Multi-head attention memungkinkan model memperhatikan informasi dari berbagai representasi subruang (subspaces) yang berbeda secara bersamaan, memperkaya konteks pemahaman token.",
    },
  ];
}
